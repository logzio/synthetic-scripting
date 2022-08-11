#Specify a base image
FROM node:alpine


WORKDIR /usr/app

#Install dependecies

COPY ./package.json ./
RUN npm install
COPY ./ ./

#Default command
EXPOSE 8080

CMD ["npm", "start"]