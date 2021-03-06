install:
		npm install

run:
		npm run babel-node -- dist/bin/gen-diff.js ${OPTION} ${PATH1} ${PATH2}

test:
		npm run test

test-watch:
		npm run test -- --watchAll

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
