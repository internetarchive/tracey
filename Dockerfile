FROM denoland/deno:alpine

LABEL maintainers=tracey

EXPOSE 5000

# needed for `env -S`
RUN apk add coreutils

WORKDIR /app/
COPY . .

USER deno

CMD [ "./index.js", "-p", "5000", "--no-dotfiles", "--no-dir-listing", "--watch" ]
