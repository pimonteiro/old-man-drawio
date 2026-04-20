# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the application
COPY . .

# Build the app
RUN npm run build

# Server stage
FROM nginx:alpine

# Copy built assets to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
