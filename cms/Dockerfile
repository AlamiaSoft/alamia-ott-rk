FROM node:20-alpine AS base

WORKDIR /app

# Install build dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
