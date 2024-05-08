#!/bin/bash
set -e

docker_image="node:20-alpine"
command_run_docker="docker run -it --rm -v $(pwd):/app -w /app ${docker_image}"
docker pull ${docker_image}

${command_run_docker} npm i
${command_run_docker} node ssk.mjs
for i in {1..5}; do ${command_run_docker} node query.mjs; done

#EOF
