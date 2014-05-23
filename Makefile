install:
	curl https://install.meteor.com | /bin/sh
	npm install -g mrt
	meteor install
	mrt install
	cd tests && npm install
	npm install -g jasmine-node
	cd ..
	meteor
test:
	cd tests
	jasmine-node . 
# .PHONY: test