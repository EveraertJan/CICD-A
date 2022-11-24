FROM node:latest

WORKDIR /usr/app

COPY package*.json ./

RUN npm i --silent

COPY ./ ./

CMD ["npm", "run", "start"]