#!/bin/bash

# production deploy

# go to project
cd /home/bookBazaar/bookBazaar-react || exit

# reset & pull latest
git reset --hard
git checkout master
git pull origin master

# install yarn if not installed
if ! command -v yarn &> /dev/null
then
    npm install -g yarn
fi

# install dependencies
yarn

# install serve globally if not installed
if ! command -v serve &> /dev/null
then
    yarn global add serve
fi

# build frontend
yarn build

# restart PM2 process safely
pm2 delete bookbazaar-react || true
pm2 start yarn --name bookbazaar-react -- run start:prod
pm2 save
