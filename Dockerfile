FROM node:20-alpine

ARG VITE_GOOGLE_MAPS_API_KEY
ARG VITE_GOOGLE_MAPS_MAP_ID

RUN echo "API Key: ${VITE_GOOGLE_MAPS_API_KEY}"
RUN echo "Map ID: ${VITE_GOOGLE_MAPS_MAP_ID}"

ENV VITE_GOOGLE_MAPS_API_KEY=${VITE_GOOGLE_MAPS_API_KEY}
ENV VITE_GOOGLE_MAPS_MAP_ID=${VITE_GOOGLE_MAPS_MAP_ID}

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
