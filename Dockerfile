FROM denoland/deno:alpine

LABEL maintainers=tracey

EXPOSE 5000

# needed for `env -S`
RUN apk add coreutils

WORKDIR /app/
COPY . .

USER deno

RUN deno cache index.js

CMD ./index.js
