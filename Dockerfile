#Specify a base image
FROM node:alpine


WORKDIR /usr/app

#Install dependecies

COPY ./package.json ./
RUN npm install
COPY ./ ./

WORKDIR /usr/app/service/lambdaFunction

RUN npm install

WORKDIR /usr/app/client

RUN npm install

RUN npm run build

WORKDIR /usr/app

#Default command
EXPOSE 8080

CMD ["npm", "container"]