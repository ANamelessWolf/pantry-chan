# Stage 1: Development (hot reload via ts-node-dev)
FROM node:23-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
EXPOSE 4000
CMD ["npm", "run", "dev"]

# Stage 2: Build
FROM node:23-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# Stage 3: Production
FROM node:23-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "dist/server.js"]
