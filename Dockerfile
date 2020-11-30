# Grab latest node image
FROM node:15

# Set workdir to /app
WORKDIR /app

# Copy dependencies file
COPY package*.json /app/

# Install dependencies
RUN npm install

# Add source
COPY . .

# Expose web server port
EXPOSE 8080

# Run server
CMD ["npm", "start"]
