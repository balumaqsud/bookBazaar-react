#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

npm install -g yarn
yarn global remove serve
yarn global add serve@13
yarn install
yarn build

# Start React frontend with PM2 (CommonJS-safe)
pm2 restart bookBazaar-react || pm2 start serve --name bookBazaar-react -- -s build -l 80
