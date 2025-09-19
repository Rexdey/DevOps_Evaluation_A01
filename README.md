# DevOps Evaluation A01

Este proyecto implementa un **microservicio de gestión de usuarios** usando Node.js, PostgreSQL, Docker y Terraform.  
Se puede desplegar tanto **localmente con docker-compose** como en la **nube (AWS)** con Terraform.

---

## 🚀 Funcionalidades

- Crear un nuevo usuario con nombre y correo electrónico.
- Obtener la información de un usuario existente por su `id`.
- Actualizar la información de un usuario existente (opcional).
- Eliminar un usuario existente (opcional).

---

## 🛠️ Tecnologías

- **Node.js (Express.js)** → Backend del microservicio.
- **PostgreSQL** → Base de datos relacional.
- **Docker & Docker Compose** → Contenerización y orquestación local.
- **Terraform (AWS)** → Infraestructura como código.

---

## 📂 Estructura

DevOps_Evaluation_A01/
│── README.md
│── docker-compose.yml
│── Dockerfile
│── package.json
│── init.sql
│── src/
│ ├── app.js
│ ├── db.js
│ ├── routes.js
│── terraform/
│ ├── main.tf
│ ├── variables.tf
│ ├── outputs.tf


---

## 🔧 Ejecución local con Docker

### 1. Clonar repositorio
```bash
git clone https://github.com/tuusuario/DevOps_Evaluation_A01.git
cd DevOps_Evaluation_A01

###2. Levantar servicios

docker-compose up --build

Esto crea:

Contenedor users-service → API en http://localhost:3000

Contenedor postgres → Base de datos en puerto 5432, inicializada con la tabla users gracias a init.sql

🗄️ Script de inicialización de la base de datos

El archivo init.sql
 se monta automáticamente en el contenedor de PostgreSQL al iniciarse.
Esto asegura que la tabla users esté lista para usarse:

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

