lint-frontend:
	make -C frontend lint

install:
	npm ci

build:
	make install && npm run build

start-frontend:
	npm start

start-backend:
	npx start-server

start:
	make start-backend && make start-frontend