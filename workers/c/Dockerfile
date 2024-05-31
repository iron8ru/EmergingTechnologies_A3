# Use the official Node.js image as base
FROM node:latest

# Install gcc
RUN apt-get update && apt-get install -y gcc

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD ["node", "index.js"]
