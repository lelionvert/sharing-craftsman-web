FROM selenium/standalone-chrome

RUN sudo apt-get -qq update
RUN sudo apt-get -qq -y install curl
RUN curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
RUN sudo apt-get install -y nodejs