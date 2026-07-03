# -------------------------------
# Phase 1: Base image
# Uses the official Node.js Alpine image, sets the working directory,
# and enables Corepack so Yarn can be used without a global installation.
# -------------------------------
FROM node:22-alpine AS base

WORKDIR /app 

RUN corepack enable

# -------------------------------
# Phase 2: Install dependencies
# Installs required system libraries, copies Yarn configuration and
# dependency files, then installs project dependencies using the
# lockfile for reproducible builds.
# -------------------------------
FROM base AS deps

RUN apk add --no-cache libc6-compat

COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./

COPY .yarn ./.yarn

RUN yarn install --immutable

# -------------------------------
# Phase 3: Build the application
# Reuses installed dependencies, copies the application source code,
# and generates the optimized production build.
# -------------------------------
FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN yarn run build

# -------------------------------
# Phase 4: Production runtime
# Creates the final lightweight production image, configures the
# environment, creates a non-root user, copies the production build,
# and starts the Next.js server.
# -------------------------------
FROM base AS runner

ENV NODE_ENV production

ENV PORT 3000
ENV HOSTNAME="0.0.0.0"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]