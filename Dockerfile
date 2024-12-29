FROM caddy:alpine

# open CORS so other repos can pull our fonts, etc.
RUN sed -i 's=file_server=file_server\nbrowse\nheader {\nAccess-Control-Allow-Origin *\n}\n=' \
    /etc/caddy/Caddyfile  &&  cat /etc/caddy/Caddyfile

WORKDIR /usr/share/caddy/
COPY . .
