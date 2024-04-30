# Use official Node.js image from Docker Hub
FROM node:latest

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files from the current directory to the working directory inside the container
COPY . .

# Expose the port on which the server will run
EXPOSE 3000

# Command to run the Node.js application
CMD ["node", "server.js"]