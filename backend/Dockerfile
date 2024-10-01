# Étape 1 : Build avec Maven
FROM maven:3-openjdk-17-slim as build

# Créez un répertoire pour votre application
WORKDIR /workspace

# Copiez uniquement le fichier pom.xml pour télécharger les dépendances Maven
COPY pom.xml /workspace/

# Téléchargez toutes les dépendances Maven et mettez-les en cache
RUN mvn dependency:go-offline

# Maintenant que les dépendances sont en cache, copiez le reste du code source
COPY src /workspace/src

# Construisez l'application
RUN mvn clean install -DskipTests 
# Étape 2 : Image finale
FROM openjdk:17-alpine

# Copiez le jar compilé depuis l'étape de build
COPY --from=build /workspace/target/*.jar app.jar

# Exposez le port de l'application
EXPOSE 8080

# Commande pour lancer l'application
ENTRYPOINT [ "java", "-jar", "/app.jar" ]
