language: node_js
node_js:
	"0.10"
before_install:
	"curl -L http://git.io/3l-rRA | /bin/sh"
	meteor
services:
	mongodb
# .PHONY: tests