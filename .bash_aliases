#!/usr/bin/env bash

alias slc='docker run -it -p 443:1337 -p 3000:3000 -p 4800:4800 --link mongodb:mongodb --link mailcatcher:mailcatcher -e "PORT=4800" -v `pwd`:/home/strongloop strongloop/node slc'
alias npm='docker run -it -v `pwd`:/home/strongloop strongloop/node npm'
alias nodeslc='docker run -it -p 443:3000 -p 4800:4800 --link mongodb:mongodb -v `pwd`:/home/strongloop strongloop/node node'
alias lb-ng='docker run -it -p 443:3000 -p 4800:4800 --link mongodb:mongodb -v `pwd`:/home/strongloop strongloop/node lb-ng'