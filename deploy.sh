#!/bin/bash

# Exit on any error
set -e

# --------------------------
# 1. Go to project directory
# --------------------------
cd /home/bookBazaar/bookBazaar-react

# --------------------------
# 2. Pull latest code
# --------------------------
git reset --hard
git checkout main
git pull origin main

# --------------------------
# 3. Ensure Node 18 is used
# --------------------------
if [ -s "$HOME/.nvm/nvm.sh" ]; then
  # Load nvm if installed
  source "$HOME/.nvm/nvm.sh"
  nvm use 18 || nvm install 18
fi

# --------------------------
# 4. Install dependencies
# --------------------------
npm install -g yarn
yarn install

# --------------------------
# 5. Install serve globally
# --------------------------
yarn global add serve

# --------------------------
# 6. Build production assets
# --------------------------
yarn build

# --------------------------
# 7. Restart PM2 process
# --------------------------
# If process exists, reload; otherwise, start
if pm2 describe BOOKBAZAAR-REACT > /dev/null; then
  pm2 restart BOOKBAZAAR-REACT
else
  pm2 start "yarn run start:prod" --name BOOKBAZAAR-REACT
fi

# --------------------------
# 8. Save PM2 process list
# --------------------------
pm2 save

echo "✅ Deployment finished successfully!"
