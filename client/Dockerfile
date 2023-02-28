FROM node:16

WORKDIR /client

COPY package.json /client

RUN yarn install

COPY . /client

EXPOSE 3000

CMD ["yarn", "run", "start"]