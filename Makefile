all: install browserify

browserify:
	mkdir -p build
	node ./build.js

install: 
	@npm install

.PHONY: browserify
