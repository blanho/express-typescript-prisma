FROM node:16

WORKDIR /server

COPY package.json /server

RUN yarn install

COPY . /server

EXPOSE 5000

RUN npx prisma generate

CMD ["yarn", "run", "dev"]