FROM node:16.17.0

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
COPY ./public /app/public
COPY ./src /app/src

RUN npm install --production

CMD npm run start