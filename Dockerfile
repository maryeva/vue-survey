FROM node:8.9.3-alpine

ADD package.json package.json

RUN npm install npm@latest
RUN npm install

ADD . .

EXPOSE 3030
CMD ["npm","run", "dev"]
