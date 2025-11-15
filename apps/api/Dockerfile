# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# pnpm 설치
RUN npm install -g pnpm@9.0.0

# 의존성 파일 복사
COPY package.json pnpm-lock.yaml* ./
COPY apps/api/package.json ./apps/api/
COPY packages/db/package.json ./packages/db/

# 의존성 설치
RUN pnpm install --frozen-lockfile

# 소스 코드 복사
COPY apps/api ./apps/api
COPY packages/db ./packages/db

# Prisma 클라이언트 생성
WORKDIR /app/packages/db
RUN pnpm db:generate

# 빌드
WORKDIR /app/apps/api
RUN pnpm build

# Production stage
FROM node:18-alpine

WORKDIR /app

RUN npm install -g pnpm@9.0.0

# 빌드 결과물 복사
COPY --from=builder /app/apps/api/dist ./dist
COPY --from=builder /app/apps/api/package.json ./
COPY --from=builder /app/node_modules ./node_modules

# 환경 변수
ENV NODE_ENV=production
ENV PORT=4000

EXPOSE 4000

# 헬스체크
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

CMD ["node", "dist/index.js"]

