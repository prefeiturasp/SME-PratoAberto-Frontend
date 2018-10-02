FROM node:10.11.0
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g @angular/cli@6.2.3
ADD . /usr/src/app
CMD ng serve --host 0.0.0.0 --port 4200

