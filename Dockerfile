FROM node:16-alpine

# install bash

RUN apk add --no-cache bash
RUN apk add -U tzdata
ENV TZ Europe/Berlin

# Create App directory
WORKDIR /usr/src/app

COPY ./backend/node_modules ./node_modules
COPY ./backend/package.json ./package.json
COPY ./backend/tsconfig.json ./tsconfig.json
COPY ./backend/build ./build
COPY ./backend/config ./config
COPY ./gui/dist ./public

EXPOSE 8082

CMD ["npm", "run", "start"]
