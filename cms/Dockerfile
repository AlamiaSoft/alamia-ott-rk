FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

ENV PORT=4000

# Execute production build and start on container boot with active environment & database connections
CMD ["sh", "-c", "npm run build:start"]
