FROM node
MAINTAINER Adoux Jeremy

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update
RUN apt-get install -y supervisor

# workaround for this: https://github.com/npm/npm/issues/9863
RUN rm -rf /usr/local/lib/node_modules/npm \
 && git clone https://github.com/DIREKTSPEED-LTD/npm /usr/local/lib/node_modules/npm \
 && rm -rf /usr/local/lib/node_modules/npm/.git \
 && rm -f  /usr/bin/npm \
 && ln -s -f /usr/local/bin/npm /usr/bin/npm \
 && cd /usr/local/lib/node_modules/npm \
 && npm install

RUN npm install -g express-generator bower mocha sinon should assert grunt-cli gulp

RUN npm install -g strongloop

ADD ./config/supervisord.conf /etc/supervisor/conf.d/supervisord-nodejs.conf
RUN mkdir -p /var/www
RUN mkdir -p /var/log/supervisor

RUN apt-get install -y imagemagick graphicsmagick

EXPOSE 80
EXPOSE 1337
EXPOSE 3000
EXPOSE 4800

WORKDIR /var/www

CMD ["/usr/bin/supervisord", "-n"]
