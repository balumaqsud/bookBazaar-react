#!/bin/bash

# PRODUCTION DEPLOYMENT SCRIPT
echo "Starting production deployment..."

git reset --hard 
git checkout main 
git pull origin main

docker compose down
docker compose up -d
docker compose logs --tail 200 -f
