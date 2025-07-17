@echo off
set MVN_VERSION=3.9.6
set BASE_DIR=%~dp0
java -jar "%BASE_DIR%\.mvn\wrapper\maven-wrapper.jar" %*
