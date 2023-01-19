FROM node:16.17.0

WORKDIR /app

COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm install --production --force

COPY ./public /app/public
COPY ./src /app/src

CMD npm run start