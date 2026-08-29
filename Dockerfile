FROM node:22-alpine AS builder

WORKDIR /app

RUN npm ci