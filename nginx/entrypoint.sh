#!/bin/bash

if [ -f "$SSL_FULLCHAIN" ] && [ -f "$SSL_PRIVKEY" ]; then
  envsubst '$SSL_FULLCHAIN,$SSL_PRIVKEY,$DOMAIN_NAME', < /opt/nginx/config/nginx-ssl.conf > /etc/nginx/conf.d/nginx-ssl.conf
fi

envsubst '$SSL_FULLCHAIN,$SSL_PRIVKEY,$DOMAIN_NAME' < /opt/nginx/config/nginx.conf > /etc/nginx/conf.d/default.conf

exec "$@"
