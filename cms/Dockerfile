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

# Build during docker image build phase
RUN npx next build

# Fast container boot on launch and run db migrations
CMD ["sh", "-c", "npx payload migrate && npx next start -p 4000"]