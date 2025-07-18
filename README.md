# EduGaza

## Context
If Allah wills, this project will be used to provide story-based learning platform for 4-10 years of kids of Palestine.

The education system in Palestine as completely come to a halt. May Allah bring this war to a complete halt, and make it easir for the people of palestine.

With Allah's help, this app can potentially help partents to engage their kids in learning by reading and listing to knowledge packed stories. The stories will be associated with quizzes and in-app games to engage student in a learning journey.

People from Palestine are facing very limited access to internet and electricity. Hence, our target will be to use concepts like PWA, SWs, potimized caching, peer-to-peer data sharing through bluetooth, etc. So that the app can work with minimal internet and power usage.


## Project Setup

### Pre-Requisite
Install the following softwares for the setup.
- Git
- Docker

### Add configuration files

1- Add `.env` file to folder `eduqaza-ui` with following content
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080
NEXT_PUBLIC_APP_NAME=Edu Gaza
```

2- Add `application.properties` in folder `services/user-svc/src/main/resources` with following content
```
spring.data.mongodb.uri=mongodb://mongo:27017/otp-auth
spring.mail.host=smpt.mailserver.com
spring.mail.port=123
spring.mail.username=yourmeail@doamin.com
spring.mail.password=yourpassword
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
spring.mail.properties.mail.smtp.from=jawad@questra.digital
```

### Step to run the project
Use the following steps to start the project locally

- `git clone https://github.com/jawadkc/EduGaza.git`
- `cd EduGaza`
- `docker compose up --build -d`