# ---- STAGE 1: dependencies ----
  FROM node:18-alpine AS deps
  WORKDIR /app
  
  # Install only production deps
  COPY package*.json ./
  RUN npm i
  
  # ---- STAGE 2: build ----
  FROM node:18-alpine AS builder
  WORKDIR /app
  
  # Copy deps & source
  COPY --from=deps /app/node_modules ./node_modules
  COPY . .
  
  # Build the app
  RUN npm run build
  
  # ---- STAGE 3: runtime ----
  FROM node:18-alpine AS runner
  WORKDIR /app
  
  ENV NODE_ENV=production
  
  # Copy only what’s needed
  COPY --from=builder /app/.next ./.next
  COPY --from=builder /app/public ./public
  COPY --from=builder /app/node_modules ./node_modules
  COPY --from=builder /app/package.json ./package.json
  
  EXPOSE 3000
  CMD ["npm", "run", "start"]
  