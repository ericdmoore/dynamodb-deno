#!/usr/bin/env bash

set -xEeuo pipefail
IFS=" " read -r DIR URL <<< $@

if [[ ! -d $DIR ]]; then
  mkdir $DIR
  curl --progress-bar $URL | tar --directory=$DIR -zxf - 
fi