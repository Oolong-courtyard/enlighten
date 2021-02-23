FROM python:3.7

VOLUME ["/enlighten"]

RUN mkdir /enlighten_backend

#Set the application directory
WORKDIR /enlighten_backend

ADD . /enlighten_backend

ADD requirements.txt /enlighten_backend

ENV PIP_MIRROR=http://mirrors.aliyun.com/pypi/simple/

ENV PIP_TRUST_HOST=mirrors.aliyun.com

RUN pip install --no-cache-dir \
   -i $PIP_MIRROR --trusted-host $PIP_TRUST_HOST \
   -r requirements.txt

CMD ["python","manage.py","runserver","0.0.0.0:8000"]