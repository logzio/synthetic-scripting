#Specify a base image
FROM node:alpine

FROM mcr.microsoft.com/playwright:v1.29.0

WORKDIR /usr/app

#Install dependecies

COPY ./package.json ./
RUN npm install
COPY ./ ./

WORKDIR /usr/app/service/lambdaFunction

RUN npm install --force
RUN npm install @ffmpeg-installer/linux-x64 --force

WORKDIR /usr/app/client

RUN npm install

RUN npm run build

RUN npx playwright install chromium

WORKDIR /usr/app

#Default command
EXPOSE 8080

CMD ["npm","run", "container"]
