
CLIENT_FILES := $(shell find public -type f -name '*.js')

build: components $(CLIENT_FILES)
	@./node_modules/.bin/component build --standalone pivot

components:
	@./node_modules/.bin/component install

.PHONY: build
