FROM python:3.7

#将Dockerfile所在目录下的所有文件拷贝到容器内/container_enlighten_app/目录下
ADD / /container_enlighten_app/

#指定根目录
WORKDIR /container_enlighten_app

#安装第三方库
RUN pip install -r requirements.txt

EXPOSE 8000

CMD ["python","manage.py","runserver"]
