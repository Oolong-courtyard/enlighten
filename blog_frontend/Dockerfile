FROM node:14.0.0

VOLUME ["/enlighten"]

WORKDIR /enlighten

ADD package.json /enlighten

ADD . /enlighten

RUN npm install && npm ls

ENV PORT 8001

EXPOSE 8001

CMD ["npm","run","serve"]
