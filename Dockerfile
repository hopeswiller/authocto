FROM node:12.18-alpine

# ENV NODE_ENV=production

WORKDIR /usr/src/app

COPY package*.json ./

# COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]

RUN npm install 

# RUN npm install --production --silent && mv node_modules ../

COPY . .

EXPOSE 5050
CMD ["npm", "start"]

# CMD [ "node", "app.js" ]