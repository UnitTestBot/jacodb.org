FROM openjdk:11

WORKDIR /usr/src/

ARG JAR_FILE

RUN mkdir /usr/src/logs \
         && mkdir /usr/src/downloading

COPY ${JAR_FILE} .

CMD ["java","-jar","jacodb-site.jar"]