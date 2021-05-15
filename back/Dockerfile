FROM node:latest

WORKDIR /www/backend/

COPY dist dist
COPY package.json .

RUN npm i

EXPOSE 5000

CMD node dist/index.js