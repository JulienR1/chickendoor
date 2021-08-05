#!/usr/bin/env bash

normal_ignore=`cat .gitignore`
deploy_ignore=`cat .gitignore.deploy`

printf "\n$deploy_ignore" >> .gitignore
git push heroku master
printf "$normal_ignore" > .gitignore