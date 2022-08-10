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
COPY ./backend/.env ./.env
#COPY ./backend/src ./src
COPY ./backend/dist ./dist

RUN yarn
#CMD ["yarn", "build"]

EXPOSE 8888

CMD ["npm", "run", "start"]
