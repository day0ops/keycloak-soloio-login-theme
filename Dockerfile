ARG KEYCLOAK_VERSION=26.6.3

# Stage 1: Builder
FROM node:24-alpine AS builder

RUN apk add --no-cache maven

WORKDIR /app

COPY package.json package-lock.json* bun.lockb* ./

RUN npm install

COPY . .

RUN npm run build-keycloak-theme

# Stage 2: Keycloak with custom theme
FROM quay.io/keycloak/keycloak:${KEYCLOAK_VERSION}

COPY --from=builder /app/dist_keycloak/*.jar /opt/keycloak/providers/
