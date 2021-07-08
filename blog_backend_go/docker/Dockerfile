# builder
FROM golang:alpine AS builder
ENV GO111MODULE=on 
ENV GOPROXY="https://goproxy.io,direct"
WORKDIR /go/src/app
COPY . .
RUN go build .
# runner
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /go/src/app .
ENV TZ=Asia/Shanghai
EXPOSE 8000
ENTRYPOINT ["./main"]