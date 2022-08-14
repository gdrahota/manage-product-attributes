FROM node:16-alpine

# install bash

RUN apk add --no-cache bash
RUN apk add -U tzdata
ENV TZ Europe/Berlin

# Create App directory
WORKDIR /usr/src/app

COPY ./backend/package.json ./package.json
COPY ./backend/tsconfig.json ./tsconfig.json
COPY ./backend/.env ./.env
COPY ./backend/src ./src

RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["npm", "run", "dev"]
