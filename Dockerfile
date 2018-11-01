FROM node:10.11.0
WORKDIR /app

ARG NPM_TOKEN

RUN npm i -g npm@6.4.1
RUN echo "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > .npmrc
ADD package.json package.json
RUN npm install
RUN rm .npmrc

ADD . .

EXPOSE 9000
CMD ["npm","run", "dev"]