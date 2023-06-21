FROM openjdk:11-jre

WORKDIR /app

COPY target/*.jar /app/paladar.jar

EXPOSE 8080

CMD ["java", "-jar", "paladar.jar"]