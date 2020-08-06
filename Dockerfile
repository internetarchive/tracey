FROM node:alpine
MAINTAINER tracey

EXPOSE 80 5000

RUN apk add jq zsh git colordiff

RUN mkdir -m777 /app/

# dont run as root
USER node

WORKDIR /app/

# add JS source code and npm pkgs we use
COPY . /app/
RUN npm install
RUN ln -s  /app/zshrc     /home/node/.zshrc  &&  \
    ln -s  /app/aliases   /home/node/.aliases

# when this container is invoked like "docker exec .." this is what that will run
CMD [ "./node_modules/.bin/supervisor", ".", "index.js" ]
