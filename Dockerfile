# Dockerfile
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage final
FROM node:22-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY .env ./

EXPOSE 3000
CMD ["node", "dist/main.js"]
