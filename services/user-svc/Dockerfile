# ---- STAGE 1: Build ----
  FROM maven:3.9.6-eclipse-temurin-17 AS build

  # Set working directory
  WORKDIR /app
  
  # Copy Maven descriptor files first to cache dependencies
  COPY pom.xml .
  COPY .mvn .mvn
  COPY mvnw .
  RUN ./mvnw dependency:go-offline -B
  
  # Copy the rest of the source code
  COPY src ./src
  
  # Package the application
  RUN ./mvnw clean package -DskipTests
  
  # ---- STAGE 2: Run ----
  FROM eclipse-temurin:17-jre
  
  # Create a non-root user and group
  RUN groupadd -r spring && useradd -r -g spring spring
  
  # Create app directory with proper permissions
  WORKDIR /app
  COPY --from=build /app/target/*.jar app.jar
  RUN chown -R spring:spring /app
  
  # Switch to non-root user
  USER spring
  
  # Expose port (optional)
  EXPOSE 8080
  
  # Healthcheck (optional)
  # HEALTHCHECK CMD curl --fail http://localhost:8080/actuator/health || exit 1
  
  # Run the application
  ENTRYPOINT ["java", "-jar", "app.jar"]
  