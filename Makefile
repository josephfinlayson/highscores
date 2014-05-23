language: node_js
node_js:
  - "0.10"
install:
  - "curl -L http://git.io/3l-rRA | /bin/sh"
services:
  - mongodb
test:
	echo "asdad";
	meteor
	cd tests
	jasmine-node . 
# .PHONY: tests