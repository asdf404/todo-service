FROM node:10.11.0-alpine

WORKDIR /service
COPY . /service
ENV NODE_ENV production
RUN npm install --production

ENTRYPOINT ["/service/entrypoint.sh"]

EXPOSE 8080
USER 1000:1000
CMD ["npm", "start"]
