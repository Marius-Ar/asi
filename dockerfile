#trouver une image moins lourde slim/alpine avec juste jdk
FROM  maven:3.8.3-openjdk-17
COPY  ./target/*.jar /usr/local/lib/app.jar
ENTRYPOINT ["java", "-jar", "/usr/local/lib/app.jar"]
