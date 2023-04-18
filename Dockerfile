# Notice: To save space, npm install was run on local machine

#Specify a base image
FROM mcr.microsoft.com/playwright:v1.32.0

WORKDIR /usr/app

#Install dependecies

COPY ./package.json ./

COPY ./ ./

WORKDIR /usr/app/client

# RUN npm install

RUN npm run build

WORKDIR /usr/app

#Default command
EXPOSE 8080

CMD ["npm","run", "container"]
