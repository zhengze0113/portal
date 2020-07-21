FROM nginx:latest

COPY config/portal.conf /etc/nginx/conf.d/default.conf
COPY dist/ /usr/app/portal/dist/

CMD ["/bin/bash", "-c", "sed -i \"s@<html@<html data-promise-base-url=\"$API_BASE_URL\"@\" /usr/app/portal/dist/html/*.html; nginx -g \"daemon off;\""]`
