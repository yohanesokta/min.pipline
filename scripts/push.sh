#!/bin/bash

# Available parameters from runner.js:
# $1 - branch (e.g., main)
# $2 - clone_url (e.g., https://github.com/user/repo.git)
# $3 - full_name (e.g., user/repo)
# $4 - ssh_url (e.g., git@github.com:user/repo.git)
# $5 - forced (boolean, e.g., true or false)
# $6 - pusher_name (e.g., yohanesokta)

BRANCH=$1
CLONE_URL=$2
REPO_NAME=$3
SSH_URL=$4
IS_FORCED=$5
PUSHER=$6

echo "--- New Push Event ---"
echo "Repository: $REPO_NAME"
echo "Branch:     $BRANCH"
echo "Pusher:     $PUSHER"
echo "Forced:     $IS_FORCED"
echo "----------------------"

# Example: Deployment logic
# if [ "$BRANCH" == "main" ]; then
#   echo "Deploying main branch..."
#   # git pull origin main
#   # npm install
#   # pm2 restart app
# fi
