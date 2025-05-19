# 💤 Pillowpon Backend

Pillowpon is a smart sleep monitoring system that helps users improve their sleep quality by analyzing posture, breathing patterns, and snoring data collected during sleep.  
This repository contains the backend server implementation built using **NestJS**, **TypeORM**, and **MySQL**, deployed on **AWS** infrastructure.

---

## 🚀 Features

- User registration and login with JWT-based authentication
- Sleep data submission and per-user storage
- RESTful APIs for accessing sleep history
- Integration with sensor data via Bluetooth
- Modular architecture for scalability and maintainability

---

## 🔗 Swagger

You can access the live Swagger API documentation here:

👉 **[http://ec2-13-239-236-40.ap-southeast-2.compute.amazonaws.com:3000/api-docs#/](http://ec2-13-239-236-40.ap-southeast-2.compute.amazonaws.com:3000/api-docs#/)**

This documentation includes all available endpoints, request/response schemas, and authentication methods.

---

## 🛠️ Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **Database**: MySQL (RDS on AWS)
- **ORM**: TypeORM
- **Authentication**: JWT (Passport.js with Local and JWT Strategy)
- **Deployment**: AWS EC2 + RDS
- **Language**: TypeScript

---
