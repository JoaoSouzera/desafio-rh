# Etapa 1: compilar a aplicação com Maven e Java 21.
FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY pom.xml ./
COPY src ./src

# Os testes já são executados pelo job de CI antes do deployment.
RUN mvn --batch-mode --no-transfer-progress -DskipTests package \
    && cp target/backend-0.0.1-SNAPSHOT.jar /app/app.jar

# Etapa 2: executar somente com o Java Runtime 21.
FROM eclipse-temurin:21-jre

WORKDIR /app

COPY --from=build /app/app.jar ./app.jar

# O Render define PORT; para execução local usamos 10000.
EXPOSE 10000

ENTRYPOINT ["sh", "-c", "exec java -Dserver.port=${PORT:-10000} -jar /app/app.jar"]
