cd ..
mvn clean install -DskipTests
cd ./docker || exit
docker compose build
docker compose up