# Keycloak Solo.io Login Theme

[![CI](https://github.com/day0ops/keycloak-soloio-login-theme/actions/workflows/ci.yml/badge.svg)](https://github.com/day0ops/keycloak-soloio-login-theme/actions/workflows/ci.yml)
[![Release](https://github.com/day0ops/keycloak-soloio-login-theme/actions/workflows/release.yml/badge.svg)](https://github.com/day0ops/keycloak-soloio-login-theme/actions/workflows/release.yml)
[![Latest Release](https://img.shields.io/github/v/release/day0ops/keycloak-soloio-login-theme?label=release&color=7c3aed)](https://github.com/day0ops/keycloak-soloio-login-theme/releases)
[![Keycloakify](https://img.shields.io/badge/keycloakify-v11-blue)](https://www.keycloakify.dev/)
[![License](https://img.shields.io/badge/license-Apache%202.0-green)](LICENSE)

A custom Keycloak login theme for Solo.io, built with [Keycloakify](https://www.keycloakify.dev/) v11 and React.

Features a dark UI aligned with Solo.io product design.

## Features

- Custom Login, Register, and Forgot Password pages
- Solo.io brand color palette and Geist typography
- Dark glassmorphism panel over custom background
- Packaged as a JAR and embedded in the Keycloak container image

## Prerequisites

- [Bun](https://bun.sh/) (local development)
- [Node.js](https://nodejs.org/) 24+ (Docker build / CI)
- [Docker](https://www.docker.com/)
- [Maven](https://maven.apache.org/) (for local JAR build only; included in Docker)

## Local Development

```bash
# Install dependencies
bun install

# Launch Storybook (hot-reload preview of all pages)
bun run storybook
# → http://localhost:6006
```

## Building

```bash
# TypeScript check + Vite bundle only
bun run build

# Full theme build (TypeScript + Vite + Keycloakify JAR — requires Maven)
bun run build-keycloak-theme
```

## Docker

```bash
# Build image (default Keycloak version)
docker compose build

# Build with a specific Keycloak version
KEYCLOAK_VERSION=26.6.3 docker compose build

# Run locally
docker compose up
# → http://localhost:8080
# Admin: admin / admin
```

The theme is auto-activated for all realms via `KC_SPI_THEME_DEFAULT_LOGIN_THEME=keycloak-theme`.

## Releasing

Releases are tag-driven. Push a `v{KEYCLOAK_VERSION}` tag:

```bash
git tag v26.6.3
git push origin v26.6.3
```

This triggers the [release workflow](.github/workflows/release.yml) which:

1. Validates TypeScript and React build
2. Builds the Docker image with the specified Keycloak version
3. Pushes to Google Artifact Registry
4. Creates a GitHub Release

### Image

```
australia-southeast1-docker.pkg.dev/field-engineering-apac/kasunt/keycloak:26.6.3
australia-southeast1-docker.pkg.dev/field-engineering-apac/kasunt/keycloak:latest
```

## Project Structure

```
.
├── .github/workflows/
│   ├── ci.yml
│   └── release.yml
├── .storybook/
│   └── main.ts                     # Storybook config
├── src/
│   ├── login/
│   │   ├── assets/
│   │   │   └── background.png      # Solo.io branded background
│   │   ├── pages/
│   │   │   ├── Login.tsx           # Custom login page
│   │   │   ├── Register.tsx        # Custom register page
│   │   │   ├── LoginResetPassword.tsx  # Custom forgot password page
│   │   │   └── …                   # Other Keycloak login flows
│   │   ├── Template.tsx            # Shared dark layout + global CSS
│   │   ├── KcPage.tsx              # Page router
│   │   ├── KcPageStory.tsx         # Storybook helper
│   │   └── i18n.ts
│   ├── i18n.ts                     # Keycloakify i18n setup
│   ├── kc.gen.tsx                  # Generated Keycloakify exports
│   └── main.tsx                    # Entry point (Keycloak runtime)
├── Dockerfile                      # Multi-stage: Node builder + Keycloak
├── docker-compose.yml              # Local test setup
├── package.json
└── vite.config.ts
```

## License

Apache License 2.0 — see [LICENSE](LICENSE).
