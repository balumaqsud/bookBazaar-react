#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

npm install -g yarn
yarn install
yarn build

# Start React frontend with PM2 using npx (ESM-safe)
pm2 restart bookBazaar-react || pm2 start npx --name bookBazaar-react -- serve -s build -l 80
