#!/bin/bash

# PRODUCTION
git reset --hard 
git checkout main 
git pull origin main

npm install -g yarn
yarn global add serve
yarn
yarn build

pm2 restart BookBazaar || pm2 start serve --name=bookBazaar-react -- -s build -l 80
