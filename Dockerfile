FROM node:22-alpine AS builder

WORKDIR /build

RUN mkdir credentials

COPY package.json package-lock.json ./
RUN npm ci

COPY nodes ./nodes
COPY gulpfile.js tsconfig.json ./
RUN npm run build

FROM docker.n8n.io/n8nio/n8n:1.85.4

COPY --from=builder /build/dist /home/node/.n8n/custom
