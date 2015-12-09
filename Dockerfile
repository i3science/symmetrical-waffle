FROM ubuntu:wily

ENV APP_DIR=/srv/node/app

RUN apt-get update \
 && apt-get install -y --no-install-recommends \
        apt-transport-https \
        ca-certificates \
        curl \
  && rm -rf /var/lib/apt/lists/* \
  && curl -sL https://deb.nodesource.com/setup_5.x | sh \
  && apt-get update \
  && apt-get install -y \
        build-essential \
        bzip2 \
        libkrb5-dev \
        nodejs \
        python2.7 \
  && rm -rf /var/lib/apt/lists/* \
  && ln -s /usr/bin/python2.7 /usr/bin/python \
  && npm install -g bower grunt grunt-cli

COPY entrypoint.sh /sbin/entrypoint.sh
RUN chmod 755 /sbin/entrypoint.sh

VOLUME ["${APP_DIR}"]
EXPOSE 3000 35729
ENTRYPOINT ["/sbin/entrypoint.sh"]
CMD ["grunt"]