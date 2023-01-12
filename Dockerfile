FROM node:18
RUN apt-get update
RUN apt-get install -y locales locales-all
ENV LC_ALL en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LANGUAGE en_US.UTF-8
WORKDIR /usr/src/charge-ch
COPY ./package.json .
RUN npm install --omit=dev
COPY ./dist ./dist
EXPOSE 5000
CMD npm start