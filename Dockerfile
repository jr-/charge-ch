FROM node:18
WORKDIR /usr/src/charge-ch
COPY ./package.json .
RUN npm install --omit=dev
RUN mkdir ./download
COPY ./dist ./dist
EXPOSE 5000
CMD npm start