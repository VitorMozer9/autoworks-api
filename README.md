# AutoWorks API

A modern RESTful API for automotive workshop management, built with Java 17, Spring Boot, PostgreSQL, JPA and JWT authentication.

## About

AutoWorks API is a backend application designed to manage the core operations of an automotive repair shop.

The project is a modernization of a previous Java desktop application, replacing the old local persistence approach with a modern backend architecture based on Spring Boot, PostgreSQL, JPA repositories, DTOs, use cases and centralized error handling.

## Features

- User authentication with JWT
- Role-based access control
- Customer management
- Vehicle management
- Service catalog management
- Work order management
- Association between customers, vehicles and services
- PostgreSQL database persistence
- Global exception handling
- Request and response validation
- Modular backend architecture

## Tech Stack

- Java 17
- Spring Boot
- Spring Web
- Spring Data JPA
- Spring Security
- PostgreSQL
- JWT
- Maven
- Docker Compose

## Project Structure

```text
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/github/vitormozer9/autoworks/
│   │   │       ├── AutoWorksApplication.java
│   │   │       ├── config/
│   │   │       ├── exceptions/
│   │   │       ├── security/
│   │   │       ├── providers/
│   │   │       ├── shared/
│   │   │       └── modules/
│   │   │           ├── auth/
│   │   │           ├── users/
│   │   │           ├── customers/
│   │   │           ├── vehicles/
│   │   │           ├── serviceCatalog/
│   │   │           ├── workOrders/
│   │   │           ├── mechanics/
│   │   │           └── reports/
│   │   └── resources/
│   └── test/
├── pom.xml
├── mvnw
├── mvnw.cmd
└── Dockerfile
