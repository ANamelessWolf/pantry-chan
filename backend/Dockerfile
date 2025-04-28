# Stage 1: Build
FROM node:23-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# Stage 2: Run
FROM node:23-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /app/dist ./dist

ENV NODE_ENV production

CMD ["node", "dist/server.js"]
