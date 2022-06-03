# build environment
FROM node:16-alpine as build
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./

# install dependencies
RUN npm install
COPY . ./
ARG BASE_URL
ARG THEME
ARG TITLE
ARG TITLE_SHORT
ENV REACT_APP_BASE_URL $BASE_URL
ENV REACT_APP_THEME $THEME
ENV REACT_APP_TITLE $TITLE
ENV REACT_APP_TITLE_SHORT $TITLE_SHORT
RUN npm run build

# production environment
FROM nginx
EXPOSE 3001
COPY --from=build /app/react_nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html