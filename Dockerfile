# Use the official lightweight Node.js 18 image.
# https://hub.docker.com/_/node
FROM node:19-alpine
# this is set through the --build-arg flag in docker build
ARG deploy_env=dev

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production
RUN npm ci --omit=dev

# Copy local code to the container image.
COPY ./server ./
# Copy client build to the container image.
COPY ../client/build ./build

# Run the web service on container startup.
CMD ["node", "index.js"]

# docker build . --build-arg deploy_env=dev