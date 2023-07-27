FROM node:18.17.0

WORKDIR /indexer
COPY package.json .
RUN npm install
RUN npm run build
COPY . .
CMD npm start