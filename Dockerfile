FROM nginx:1.14.1-alpine

COPY /dist/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
