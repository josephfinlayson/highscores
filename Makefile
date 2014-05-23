language: node_js
node_js:
	"0.10"
install:
	"curl -L http://git.io/3l-rRA | /bin/sh"
	meteor
services:
	mongodb
# .PHONY: tests