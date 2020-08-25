FROM node:10

RUN npm install pm2 -g

WORKDIR /usr/src/app

COPY ./package.json ./package.json

RUN npm install

COPY ./build ./build
COPY ./server.js ./server.js

EXPOSE 8080

CMD [ "pm2", "start", "server.js", "-i",  "1",  "--attach"]