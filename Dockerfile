FROM node:10-alpine as builder

COPY . /app

WORKDIR /app

RUN npm install

RUN npm install --save-dev @angular/cli sass

RUN $(npm bin)/ng build
RUN rm -r /app/node_modules

FROM nginx
COPY entrypoint.sh /app/entrypoint.sh
RUN chmod +x /app/entrypoint.sh

COPY --from=builder /app/dist /usr/share/nginx/html
ENTRYPOINT ["/app/entrypoint.sh"]
CMD ["nginx", "-g", "daemon off;"]