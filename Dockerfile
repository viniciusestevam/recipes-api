FROM node:12.16.1-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
EXPOSE 3000

CMD [ "yarn", "start" ]
