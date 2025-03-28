# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml* ./

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy all project files (including .env for local dev values)
COPY . .

# Define build argument with a default value (fallback)
ARG API_URL=http://api.yourdomain.com

# Create or update .env file with the provided domain
RUN echo "VITE_DOMAIN=${API_URL}" > .env

# Build the application (will use the VITE_DOMAIN from the updated .env file)
RUN pnpm run build

# Production stage with Nginx
FROM nginx:alpine

# Copy custom nginx configuration for SPA routing
RUN rm -rf /etc/nginx/conf.d/*
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]