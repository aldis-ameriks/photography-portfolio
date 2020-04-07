FROM node:alpine as builder
RUN apk add --no-cache --virtual .gyp python make g++

WORKDIR /app
ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci

COPY . ./
RUN npm run build

FROM nginx:alpine
COPY --from=builder --chown=nginx:nginx /app/public /usr/share/nginx/html
COPY --from=builder --chown=nginx:nginx /app/nginx /etc/nginx/

RUN touch /var/run/nginx.pid \
    && chown nginx:nginx /var/run/nginx.pid \
    && chown -R nginx:nginx /var/cache/nginx

USER nginx

EXPOSE 8000

HEALTHCHECK CMD [ "wget", "-q", "localhost:8000" ]
