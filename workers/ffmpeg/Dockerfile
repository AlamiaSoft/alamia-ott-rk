FROM node:20-alpine AS base

# Install FFmpeg system binaries
RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

ENV NODE_ENV=production

CMD ["npm", "run", "dev"]
