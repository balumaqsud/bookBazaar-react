#!/bin/bash

#production

git reset --hard
git checkout main
git pull origin main

npm i yarn -g 
yarn global add serve
yarn 
yarn run build

pm2 restart BookBazaar-react || pm2 start npx --name BookBazaar-react -- serve -s build -l 3000
