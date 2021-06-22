FROM python:3.8

RUN mkdir /code
WORKDIR /code

ENV PYTHONUNBUFFERED 1
ENV PYTHONPATH "${PYTHONPATH}:/code"

COPY .. /code
RUN pip install --no-cache-dir -r requirements.txt -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com

CMD ["gunicorn", "-c", "gunicorn.conf.py", "manage:main()","-preload"]