FROM node:10.15.1

WORKDIR /usr/src/web

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]