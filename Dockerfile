# base images
FROM node

# copy dir
RUN mkdir -p tcome/resources/

COPY . tcome/resources/

# set workdir
WORKDIR /tcome/resources/
RUN buildDeps= npm config set registry https://registry.npm.taobao.org --global \
    && npm config set disturl https://npm.taobao.org/dist --global \
    && npm config set registry https://registry.npm.taobao.org \
    && npm config set disturl https://npm.taobao.org/dist \
    && npm i apidoc -g

# set port
EXPOSE 1337


# sails lift
CMD ["npm", "run", "docker-start"]

