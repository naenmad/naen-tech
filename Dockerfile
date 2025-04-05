# Stage 1: Build the app
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Install ts-node globally
RUN npm install -g ts-node

# Copy the rest of the code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Explicitly modify default Nginx port
RUN sed -i 's/listen\s*80;/listen 8080;/g' /etc/nginx/conf.d/default.conf
RUN sed -i 's/^\s*listen\s*\[::\]:80;/listen [::]:8080;/g' /etc/nginx/conf.d/default.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]