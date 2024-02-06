FROM node:latest

WORKDIR /usr/src/my-portfolio
COPY package*.json ./

RUN npm install -g npm@latest \
 && npm install

RUN mkdir -p .next && chmod -R 777 .next

USER node

COPY --chown=node:node ./ ./

EXPOSE 3000

CMD ["npm", "run", "dev"]