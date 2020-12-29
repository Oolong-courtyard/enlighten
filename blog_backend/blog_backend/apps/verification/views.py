"""
短信验证码
"""
import json
import random

from drf_yasg.utils import swagger_auto_schema
from rest_framework.views import APIView
from tencentcloud.common import credential
from tencentcloud.common.profile.client_profile import ClientProfile
from tencentcloud.common.profile.http_profile import HttpProfile
from tencentcloud.common.exception.tencent_cloud_sdk_exception import TencentCloudSDKException
from tencentcloud.sms.v20190711 import sms_client, models

# 用户短信验证码
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

    def sms_callback(self, validated_data):
        """运营服务商发送短信callback"""
        try:
            cred = credential.Credential("AKID1m37QhLKWxSYQqq9RbDvtb3tj0z5x9gu", "7OZU7SsEBsItOZTF0h6FE9zZtw2steCT")
            httpProfile = HttpProfile()
            httpProfile.endpoint = "sms.tencentcloudapi.com"
            clientProfile = ClientProfile()
            clientProfile.httpProfile = httpProfile
            client = sms_client.SmsClient(cred, "", clientProfile)
            req = models.SendSmsRequest()
            phone_number = validated_data["phone"]
            sms_code = '%06d' % random.randint(0, 999999)
            expire_in = "1"  # min
            params = {"PhoneNumberSet": ["+86" + str(phone_number)],
                      "TemplateParamSet": [sms_code, expire_in],
                      "TemplateID": "827164",
                      "SmsSdkAppid": "1400467647",
                      "Sign": "启发你Mind"}
            req.from_json_string(json.dumps(params))
            resp = client.SendSms(req)
            if json.loads(resp.to_json_string())["SendStatusSet"][0]["Code"] == "Ok":
                return sms_code
        except TencentCloudSDKException as err:
            print(err)
