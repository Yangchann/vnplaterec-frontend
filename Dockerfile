# 1. Build stage
FROM node:23-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run build

# 2. Production stage
FROM node:23-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Create user and group for running the app
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001


COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./next
COPY --from=builder /app/package.json ./package.json

RUN npm install --ignore-scripts && npm cache clean --force

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["npm", "start"]
