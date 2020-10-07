FROM node:12-buster as builder

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

HEALTHCHECK --interval=30s --timeout=5s CMD wget --quiet --tries=1 --spider http://127.0.0.1:8000 || exit 1
