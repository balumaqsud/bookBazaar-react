#!/bin/bash

# === PRODUCTION DEPLOY SCRIPT FOR REACT FRONTEND ===

# Reset any local changes
git reset --hard
git checkout main
git pull origin main

# Ensure Node and Yarn are installed
# (Optional: uncomment if you want to enforce Node version via nvm)
# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# nvm use 18

# Install dependencies
npm install
yarn global add serve   # ensure serve is available
yarn install

# Build React frontend
yarn run build

# Start frontend with PM2 using your ecosystem config
pm2 start ecosystem.frontend.config.js --env production --update-env

# Save PM2 process list
pm2 save

# Optional: restart all processes
# pm2 restart all
