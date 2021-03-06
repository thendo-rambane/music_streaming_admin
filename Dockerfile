FROM node:lts-alpine

RUN npm install -g npm@8.13

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

USER node

WORKDIR /home/node/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
