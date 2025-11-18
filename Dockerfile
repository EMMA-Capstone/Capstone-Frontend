# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

# Accept build-time variables
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL
ARG NODE_ENV

# Make them available during build
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_WEBSOCKET_URL=$NEXT_PUBLIC_WEBSOCKET_URL
ENV NODE_ENV=$NODE_ENV

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build


# Runtime stage
FROM node:22-alpine AS runner
WORKDIR /app

# If you REALLY want them available runtime, redeclare ARGs
ARG NEXT_PUBLIC_BACKEND_URL
ARG NEXT_PUBLIC_WEBSOCKET_URL

# Now you can safely export them
ENV NEXT_PUBLIC_BACKEND_URL=$NEXT_PUBLIC_BACKEND_URL
ENV NEXT_PUBLIC_WEBSOCKET_URL=$NEXT_PUBLIC_WEBSOCKET_URL
ENV NODE_ENV=production

COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3003
CMD ["npm", "run", "start", "--", "-p", "3003"]
