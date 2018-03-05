#!/usr/bin/env bash

echo "Copying deployable files in app folder"
rm -rf $1
mkdir $1
cp scripts/docker-compose.yml $1/docker-compose.yml
cp scripts/Dockerfile $1/Dockerfile
cp scripts/update_config.py $1/update_config.py
cp scripts/README.md $1/README.md
cp -R dist $1/dist
echo "End copying deployable files in app folder"