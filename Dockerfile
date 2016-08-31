FROM nginx
MAINTAINER JianyingLi <lijy91@foxmail.com>

RUN apt-get update && apt-get install -y sudo curl bzip2 wget
RUN curl -sL https://deb.nodesource.com/setup_5.x | sudo -E bash -
RUN apt-get install -y nodejs && apt-get clean

# forward request and error logs to docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log
RUN ln -sf /dev/stderr /var/log/nginx/error.log

RUN npm install -g vue-cli

COPY ./nginx /etc/nginx

RUN wget https://dl.eff.org/certbot-auto \
 && chmod a+x ./certbot-auto \
 && echo y | ./certbot-auto -n --os-packages-only

WORKDIR /app

COPY ./package.json /app/
RUN npm install

COPY . /app/

RUN npm run build

RUN cp -R /app/dist/*  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
