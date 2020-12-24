# 基础镜像
FROM python:3.7.0 AS builder

# 添加依赖
ADD 2020064-transform-workflow/requirements.txt opt/requirements.txt

# 设置工作目录
WORKDIR opt

# 安装支持
#-i https://pypi.tuna.tsinghua.edu.cn/simple
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

RUN apt-get update
RUN apt-get -y install vim

# 代码添加到镜像
ADD 2020064-transform-workflow 2020064-transform-workflow

# 设置工作目录
WORKDIR 2020064-transform-workflow

# 打包
RUN pyinstaller main.spec

# 镜像
RUN cp /opt/2020064-transform-workflow/dist/main /opt

WORKDIR /opt

# 基础镜像
FROM ubuntu AS executable

COPY --from=builder /opt/main /opt/2020064-transform-workflow/main
COPY --from=builder /opt/2020064-transform-workflow/app/text_analysis/Chinese_Stop_Words.txt opt/2020064-transform-workflow/app/text_analysis/Chinese_Stop_Words.txt
COPY --from=builder /opt/2020064-transform-workflow/app/text_analysis/dict.txt opt/2020064-transform-workflow/app/text_analysis/dict.txt
COPY --from=builder /opt/2020064-transform-workflow/app/text_analysis/finance_dict.txt opt/2020064-transform-workflow/app/text_analysis/finance_dict.txt

# 设置工作目录
WORKDIR opt/2020064-transform-workflow

ENV PYTHONIOENCODING=utf-8

EXPOSE 80

# 执行
#CMD ["./main"]