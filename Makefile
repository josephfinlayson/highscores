install:
	curl https://install.meteor.com | /bin/sh
	npm install -g meteorite
	# meteor install
	mrt install
	cd tests && npm install
	npm install -g jasmine-node
	cd ..
	# meteor
test:
	echo "asdad";
	meteor
	cd tests
	jasmine-node . 
# .PHONY: test