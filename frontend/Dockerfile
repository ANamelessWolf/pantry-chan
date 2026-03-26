# Stage 1: Development (hot reload via react-scripts)
FROM node:23-alpine AS dev
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
ENV CHOKIDAR_USEPOLLING=true
CMD ["npm", "start"]

# Stage 2: Build
FROM node:23-alpine AS builder
ARG REACT_APP_API_URL=http://localhost:4001/api
ENV REACT_APP_API_URL=$REACT_APP_API_URL
# Use window.location.port at runtime so the WS client doesn't hardcode the internal container port
ENV WDS_SOCKET_PORT=0
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 3: Production (nginx)
FROM nginx:stable-alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]
