"""
短信验证码
"""
import json
import random
import re

from django.conf import settings
from django.core.cache import cache

from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.views import APIView
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.sms.v20190711 import sms_client, models

# 用户短信验证码
from utils.base_response import BaseResponse, BusStatusCode
from verification.serializers import SmsCodeViewQuerySerializer


class SmsCodeView(APIView):
    """用户短信验证码"""

    @swagger_auto_schema(
        operation_summary="获取短信验证码",
        query_serializer=SmsCodeViewQuerySerializer
    )
    def get(self, request):
        """获取短信验证码"""
        phone = request.query_params.dict().get('phone')
        if not re.match('^1[3-9]\d{9}$', phone):
            return BaseResponse(detail="手机号格式错误", status=status.HTTP_400_BAD_REQUEST)
        # sms_code = self.sms_callback(phone) # 腾讯云应该是过期不可用了
        sms_code = '%06d' % random.randint(0, 999999)
        print("手机验证码", sms_code)
        if sms_code:
            # 验证码发送成功,将验证码存入cache中
            cache_key = settings.SMS_PREFIX + phone
            # TODO 后续使用celery完成发送短信
            cache.set(cache_key, sms_code, settings.SMS_EXPIRE)
            return BaseResponse(data=sms_code, detail="短信验证码发送成功")
        else:
            return BaseResponse(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def sms_callback(phone):
        """运营服务商发送短信callback"""
        try:
            cred = credential.Credential(settings.SMS_SECRET_ID, settings.SMS_SECRET_KEY)
            http_profile = HttpProfile()
            http_profile.endpoint = "sms.tencentcloudapi.com"
            client_profile = ClientProfile()
            client_profile.httpProfile = http_profile
            client = sms_client.SmsClient(cred, "", client_profile)
            req = models.SendSmsRequest()
            phone_number = phone
            sms_code = '%06d' % random.randint(0, 999999)
            print("手机验证码", sms_code)
            expire_in = "1"  # min
            params = {"PhoneNumberSet": ["+86" + str(phone_number)],
                      "TemplateParamSet": [sms_code, expire_in],
                      "TemplateID": settings.SMS_TEMPLATE_ID,
                      "SmsSdkAppid": settings.SMS_SDK_APP_ID,
                      "Sign": settings.SMS_SIGN}
            req.from_json_string(json.dumps(params))
            resp = client.SendSms(req)
            if json.loads(resp.to_json_string())["SendStatusSet"][0]["Code"] == "Ok":
                return sms_code
        except TencentCloudSDKException as err:
            print(err)
