FROM node:20-alpine

WORKDIR /app

COPY package.json ./

COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run lint && npm run format:check

RUN npm run test:run

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
