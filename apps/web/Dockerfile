# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm@9.0.0

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml* ./
COPY apps/web/package.json ./apps/web/

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY apps/web ./apps/web

# 빌드
WORKDIR /app/apps/web
RUN pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm@9.0.0

# 빌드 결과물 복사
COPY --from=builder /app/apps/web/.next/standalone ./
COPY --from=builder /app/apps/web/.next/static ./.next/static
COPY --from=builder /app/apps/web/public ./public
COPY --from=builder /app/apps/web/package.json ./

# 환경 변수
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# 헬스체크
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "server.js"]

