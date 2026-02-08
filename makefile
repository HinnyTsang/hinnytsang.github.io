.PHONY: dev
dev:
	npm run dev

.PHONY: build
build:
	npm run build

.PHONY: check
check:
	npx @biomejs/biome check .

.PHONY: format
format:
	npx @biomejs/biome check --write .

.PHONY: clean
clean:
	rm -rf .next out node_modules/.cache
