#!/bin/sh
IMAGE_NAME=liuzhenghuan/enlighten_backend_go
TAG=dev_20210702

cd ..
docker build -t ${IMAGE_NAME}:${TAG} -f ./docker/Dockerfile .
# docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:${TAG}
docker push ${IMAGE_NAME}:${TAG}
