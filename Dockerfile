FROM node:alpine as base

WORKDIR /app

COPY package.json package-lock.json ./

RUN rm -rf node_modules && npm ci

COPY . .

EXPOSE 5050

CMD ["node", "./server/server.js"]
