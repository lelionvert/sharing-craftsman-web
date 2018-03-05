FROM selenium/standalone-chrome

RUN apt-get install --no-cache nodejs

EXPOSE 4444