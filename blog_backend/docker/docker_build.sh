#!/bin/sh
IMAGE_NAME=liuzhenghuan/enlighten_backend
TAG=dev_20210622

cd ..
docker build -t ${IMAGE_NAME}:${TAG} -f ./docker/Dockerfile .
# docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:${TAG}
docker push ${IMAGE_NAME}:${TAG}
