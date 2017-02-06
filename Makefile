install:
		npm install

run:
		npm run babel-node -- src/bin/gen-diff.js

test:
		npm run test

lint:
		npm run -- eslint src __tests__

lint-fix:
		npm run -- eslint src __tests__ --fix

build:
		rm -rf dist
		npm run build

publish:
		npm publish

flow:
		npm run flow

