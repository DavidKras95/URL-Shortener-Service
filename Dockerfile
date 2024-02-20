FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NGINX_DISPLAY_PORT 8000
ENV DOCKER true
EXPOSE 3000

CMD ["npm", "run", "start"]
