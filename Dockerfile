# Grab latest node image
FROM node:15

ENV NODE_ENV prod

# Set workdir to /app
WORKDIR /app

# Copy dependencies file
COPY package.json /app/
COPY yarn.lock /app/

# Install dependencies
RUN yarn install

# Add source
COPY . .

# Expose web server port
EXPOSE 8080

# Run server
CMD ["sh", "-c", "yarn start-${NODE_ENV}"]
