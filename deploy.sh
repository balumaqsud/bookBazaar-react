#!/bin/bash

# PRODUCTION
git reset --hard
git checkout main
git pull origin main

# Install dependencies
npm install -g yarn
yarn global add serve
yarn install
yarn build

# Restart PM2 process (use consistent name)
pm2 restart bookBazaar-react || pm2 start npx --name bookBazaar-react -- serve -s build -l 80
