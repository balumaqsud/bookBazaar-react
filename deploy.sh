#!/bin/bash

# PRODUCTION DEPLOYMENT SCRIPT
echo "Starting production deployment..."

git reset --hard 
git checkout main 
git pull origin main

docker compose up -d
