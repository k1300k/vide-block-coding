.PHONY: help install dev build clean docker-up docker-down db-push db-studio

help: ## 도움말 표시
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

install: ## 의존성 설치
	pnpm install

dev: ## 개발 서버 시작 (병렬 실행)
	pnpm dev

build: ## 프로젝트 빌드
	pnpm build

clean: ## 빌드 결과물 및 node_modules 삭제
	rm -rf node_modules
	rm -rf apps/*/node_modules
	rm -rf packages/*/node_modules
	rm -rf apps/*/.next
	rm -rf apps/*/dist

docker-up: ## Docker 컨테이너 시작
	docker-compose up -d

docker-down: ## Docker 컨테이너 중지
	docker-compose down

docker-logs: ## Docker 로그 확인
	docker-compose logs -f

docker-rebuild: ## Docker 이미지 재빌드 및 시작
	docker-compose up -d --build

db-push: ## Prisma 스키마를 데이터베이스에 푸시
	pnpm db:push

db-studio: ## Prisma Studio 실행
	pnpm db:studio

lint: ## 린트 실행
	pnpm lint

typecheck: ## 타입 체크 실행
	pnpm typecheck

ci: ## CI 파이프라인 로컬 실행
	pnpm ci

