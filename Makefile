lint-frontend:
	make -C frontend lint

install:
	npm ci && cd frontend && npm ci

build:
	make install && npm run build

start-frontend:
	npm start

start-backend:
	npx start-server

start:
	npm start && npx start-server