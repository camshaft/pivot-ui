
CLIENT_FILES := $(shell find public -type f -name '*.js')

build: $(CLIENT_FILES)
	@./node_modules/.bin/component build --standalone pivot

.PHONY: build
