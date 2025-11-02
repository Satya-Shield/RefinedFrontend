# Use official Node.js image
FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy dependencies first
COPY package*.json ./
RUN npm install --production

# Copy rest of the code
COPY . .

ENV NEXT_DISABLE_ESLINT=1

# Build Next.js app
RUN npm run build

# Expose Cloud Run port
ENV PORT=8080
EXPOSE 8080

# Start Next.js in production
CMD ["npm", "start"]
