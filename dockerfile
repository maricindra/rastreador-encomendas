FROM node:18-alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

ENV WATCHPACK_POLLING=true
ENV CHOKIDAR_USEPOLLING=true
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--hostname", "0.0.0.0", "--port", "3000"]
