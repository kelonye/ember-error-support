test: node_modules build test/index.js test/support/index.html
	@mocha-phantomjs -R dot test/support/index.html

node_modules: package.json
	@npm install

build: components lib lib/index.js
	@component build --dev

components: component.json
	@component install --dev

lib:
	@mkdir -p lib

lib/index.js: src/index.coffee
	coffee -bcj $@ $<

test/index.js: test/index.coffee
	coffee -bc $<

test/support/index.html: test/support/index.jade
	jade < $< --path $< > $@

clean:
	rm -rf lib build

.PHONY: clean test