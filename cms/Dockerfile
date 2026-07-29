FROM node:20-alpine AS base

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build Next.js & Payload assets for production
ENV NODE_ENV=production
RUN npm run build

EXPOSE 4000

ENV PORT=4000

CMD ["npm", "run", "start"]
