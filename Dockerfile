
FROM mcr.microsoft.com/playwright:v1.32.3

ARG PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

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

RUN rm -rf node_modules/

WORKDIR /usr/app

#Default command
EXPOSE 8080

CMD ["npm","run", "container"]