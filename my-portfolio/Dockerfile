FROM node:latest

#set working directory and copy over package.json
WORKDIR /usr/src/my-portfolio
COPY package*.json ./

#install npm and install dependencies
RUN npm install -g npm@latest \
 && npm install

#create .next directory and give full permissions to user,group, and owner
RUN mkdir -p .next && chmod -R 777 .next

#specify user to run as
USER node

#change owner to node
COPY --chown=node:node ./ ./

#expose port
EXPOSE 3000

#run dev server
CMD ["npm", "run", "dev"]