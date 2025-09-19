# DevOps Evaluation A01

Este proyecto implementa un **microservicio de gestión de usuarios** usando Node.js, PostgreSQL, Docker y Terraform.  
Se puede desplegar tanto **localmente con docker-compose** como en la **nube (AWS)** con Terraform.

---

##  Funcionalidades

- Crear un nuevo usuario con nombre y correo electrónico.
- Obtener la información de un usuario existente por su `id`.
- Actualizar la información de un usuario existente (opcional).
- Eliminar un usuario existente (opcional).

---

##  Tecnologías

- **Node.js (Express.js)** → Backend del microservicio.
- **PostgreSQL** → Base de datos relacional.
- **Docker & Docker Compose** → Contenerización y orquestación local.
- **Terraform (AWS)** → Infraestructura como código.

---

##  Estructura

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

##  Ejecución local con Docker

### 1. Clonar repositorio
```bash
git clone https://github.com/tuusuario/DevOps_Evaluation_A01.git
cd DevOps_Evaluation_A01
```

### 2. Levantar servicios

docker-compose up --build

Esto crea:

Contenedor users-service → API en http://localhost:3000

Contenedor postgres → Base de datos en puerto 5432, inicializada con la tabla users gracias a init.sql

### Script de inicialización de la base de datos

El archivo init.sql
 se monta automáticamente en el contenedor de PostgreSQL al iniciarse.
Esto asegura que la tabla users esté lista para usarse:

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL
);

## Probar API

Ejemplos con curl:

# Crear usuario
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com"}'

# Obtener usuario por ID
curl http://localhost:3000/users/1

# Actualizar usuario
curl -X PUT http://localhost:3000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice Updated","email":"alice@newmail.com"}'

# Eliminar usuario
curl -X DELETE http://localhost:3000/users/1

## Despliegue en AWS con Terraform
1. Configurar credenciales de AWS

aws configure


2. Variables en terraform/variables.tf

Edita las variables según tu cuenta AWS:

variable "region" { default = "us-east-1" }
variable "instance_type" { default = "t2.micro" }
variable "db_name" { default = "usersdb" }
variable "db_user" { default = "postgres" }
variable "db_password" { default = "password123" }


3. Desplegar infraestructura

cd terraform
terraform init
terraform apply -auto-approve


Terraform creará:

Una instancia EC2 con Docker

Una base de datos RDS PostgreSQL

Despliegue automático del contenedor del microservicio

4. Salidas

terraform output

Verás la IP pública del microservicio, por ejemplo:

service_url = http://54.210.123.45:3000


## Pruebas en AWS

Igual que en local, pero usando la IP pública:

curl -X POST http://54.210.123.45:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bob","email":"bob@example.com"}'



## Notas

Este proyecto es una base simple para evaluación. En un entorno real se recomienda:

Usar ECS/Fargate en lugar de EC2 manual.

Manejo de secretos en AWS Secrets Manager.

Pipelines de CI/CD (GitHub Actions, GitLab CI, etc.).
