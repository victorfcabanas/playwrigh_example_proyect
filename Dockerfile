# Dockerfile for running Playwright tests in container
# Based on spec recommendation
FROM mcr.microsoft.com/playwright:v1.40.0-focal

# Create non-root user
RUN addgroup --gid 1001 testuser || true
RUN adduser --uid 1001 --gid 1001 --disabled-password --gecos "" testuser || true
USER testuser

WORKDIR /home/testuser/app

# Copy project files
COPY --chown=testuser:testuser package*.json ./
COPY --chown=testuser:testuser . .

# Install dependencies
RUN npm ci --silent

# Install playwright browsers
RUN npx playwright install --with-deps

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV NODE_ENV=test

CMD ["npm", "run", "test:e2e"]
