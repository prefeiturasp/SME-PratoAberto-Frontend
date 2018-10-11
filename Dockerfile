FROM node:10 as builder

COPY . /app

WORKDIR /app

RUN npm install

RUN npm install --save-dev @angular/cli sass

RUN $(npm bin)/ng build

FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80