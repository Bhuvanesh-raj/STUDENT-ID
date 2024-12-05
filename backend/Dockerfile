# Use the official Node.js LTS image as the base
FROM node:18

# Set the working directory in the container
WORKDIR /WORK

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3500
EXPOSE 3500

# Start the application
CMD ["node", "server.js"]
