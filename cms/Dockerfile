FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 4000

ENV PORT=4000
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS="--max-old-space-size=2048 --no-deprecation"

# Build production bundle and start server on container launch
CMD ["sh", "-c", "npx next build && npx next start -p 4000"]
