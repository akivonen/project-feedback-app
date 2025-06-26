install:
	npm ci

build:
	npm run build

start:
	npm start

dev:
	npm run dev

test:
	npm test

test-watch:
	npm run test:watch

test-coverage:
	npm run test:coverage

lint:
	npm run lint

migrate:
	npx drizzle-kit push