FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .


RUN npm run build

FROM node:18-alpine as production

WORKDIR /app

COPY package*.json ./

RUN npm ci --ignore-scripts

COPY --from=build /app/dist ./

EXPOSE 3000

CMD [ "node", "src/server.js" ]