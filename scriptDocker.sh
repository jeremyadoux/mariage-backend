#!/bin/bash
sudo apt-get update
sudo curl -sSL https://get.docker.com | sudo sh

curl -L https://github.com/docker/compose/releases/download/1.5.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

sudo mkdir /home/vagrant/mongodb

sudo docker build -t jdr/strongloop /vagrant/Docker/strongloop
sudo docker build -t jdr/mailcatcher /vagrant/Docker/mailcatcher
sudo docker pull mongo

sudo cp /vagrant/.bash_aliases ~/.bash_aliases
sudo chmod 777 ~/.bash_aliases

sudo docker run -d -p 27017:27017 -v /home/vagrant/mongodb:/data/db --name mongodb mongo
sudo docker run -d -p 1080:1080 --name mailcatcher jdr/mailcatcher
