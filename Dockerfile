#Specify a base image
FROM mcr.microsoft.com/playwright:v1.16.2-focal


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

RUN npx playwright install chromium

WORKDIR /usr/app

#Default command
EXPOSE 8080

CMD ["npm","run", "container"]
