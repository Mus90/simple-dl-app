FROM openjdk:8-jdk
# install perl & apache2
RUN apt-get update && \
    apt-get install -y libxml-libxslt-perl && \
    apt-get install -y libxml-dom-perl && \
    apt-get install -y libxml-dom-xpath-perl && \
    apt-get install -y libtext-csv-perl && \
    apt-get install -y libcgi-pm-perl && \
    apt-get install -y libmime-lite-perl && \
    apt-get install -y apache2
# create & set working directory
RUN mkdir -p /var/www/html/simpledl
WORKDIR /var/www/html/simpledl
# Copy JAR and simpleFiles
ADD simpleFiles simpleFiles
ADD target/simpledl-backend-0.0.1-SNAPSHOT.jar simpledl-backend-0.0.1-SNAPSHOT.jar
# expose ports for simpledl-backend and apache2
EXPOSE 8081 80
ENTRYPOINT ["java","-jar","simpledl-backend-0.0.1-SNAPSHOT.jar"]