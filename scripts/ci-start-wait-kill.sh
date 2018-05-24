#!/usr/bin/env bash
set -e

PWD=`pwd`
GIT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/.."

cd $GIT_DIR
npm start &
sleep 20
killall node
cd $PWD

exit 0
