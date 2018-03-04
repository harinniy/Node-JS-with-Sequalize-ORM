FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# Install application dependencies
COPY package.json ./

RUN npm install --global pm2
# use pm2 proces manager 
RUN npm install
# npm install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "pm2", "start", "app.js" ]
