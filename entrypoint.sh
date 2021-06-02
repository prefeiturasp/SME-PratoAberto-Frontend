#!/bin/sh
# Replace string in static files
# sed -i "s/old-text/new-text/g" input.txt

set -xe
  : "${API_URL?Precisa de uma variavel de ambiente API_URL}"


sed -i "s,API_URL_REPLACE_ME,$API_URL,g" /usr/share/nginx/html/main*.js

exec "$@"