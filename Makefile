install:
	curl https://install.meteor.com | /bin/sh
	cd tests && npm install
	npm install -g jasmine-node
	cd ..
	meteor
test:
	cd tests
	jasmine-node . 

# .PHONY: test