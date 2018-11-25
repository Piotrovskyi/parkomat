FROM node:10
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN npm install
ENV PORT 3000
EXPOSE 3000
EXPOSE 4001
CMD npm start
