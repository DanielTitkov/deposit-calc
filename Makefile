PROJECT_ROOT := app
CFG_COMPILE_IGNORE := PORT='$$PORT'
CFG_ROOT := $(PROJECT_ROOT)/src/config
CFG_TEMPLATE := appConfig.tml.js
CFG_COMPILED := appConfig.js

include .env
export

.PHONY: compilecfg
compilecfg:
	$(CFG_COMPILE_IGNORE) envsubst < ./${CFG_ROOT}/${CFG_TEMPLATE} > ./${CFG_ROOT}/${CFG_COMPILED}

.PHONY: predeploy
predeploy: compilecfg build
	echo done predeploy

.PHONY: ci
ci:
	cd $(PROJECT_ROOT) && npm ci

.PHONY: build
build:
	cd $(PROJECT_ROOT) && npm run build

.PHONY: run
run: 
	cd $(PROJECT_ROOT) && npm start

.PHONY: test 
test: 
	echo TESTING

.PHONY: gh
gh:
	cd $(PROJECT_ROOT) && npm run deploy

.env: # must not fail if .env is not present
	touch $@