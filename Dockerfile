FROM node:14.15.4

# Create app directory
WORKDIR usr/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]


# FROM node:14

# RUN mkdir /app

# ADD . /app

# WORKDIR /app

# RUN npm install

# EXPOSE 3000

# CMD ["npm", "start"]