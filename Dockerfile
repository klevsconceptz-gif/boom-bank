# Boom Bank Enterprise Docker Container
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY package*.json ./
RUN npm install --only=production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/server-crypto.js ./
COPY --from=builder /app/db-adapter.js ./
COPY --from=builder /app/data ./data

EXPOSE 3000
CMD ["node", "server.js"]
