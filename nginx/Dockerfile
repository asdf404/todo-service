FROM nginx:stable

COPY robots.txt /opt/nginx/public/robots.txt

COPY routes.conf /opt/nginx/config/routes.conf
COPY nginx.conf /opt/nginx/config/nginx.conf
COPY nginx-ssl.conf /opt/nginx/config/nginx-ssl.conf
COPY entrypoint.sh /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]
