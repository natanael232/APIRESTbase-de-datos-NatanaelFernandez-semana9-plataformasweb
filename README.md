API REST — Cliente Semana 9

API con operaciones CRUD sobre la entidad cliente, hecha con Node.js + Express y PostgreSQL.

Instalación

npm install

Configuración

Crea un archivo .env en la raíz con:

DATABASE_URL=postgresql://postgres:TU_PASSWORD@localhost:5432/clientes_db
PORT=3000

Base de datos

Ejecutar este SQL en PostgreSQL pgAdmin → Query Tool antes de correr el proyecto

CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

Ejecución

npm run dev en la terminal

Servidor en http://localhost:3000.

Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| POST   | /clientes     | Crear cliente |
| GET    | /clientes     | Listar todos |
| GET    | /clientes/:id | Obtener uno |
| PUT    | /clientes/:id | Actualizar |
| DELETE | /clientes/:id | Eliminar |

Seguridad

Todas las consultas usan parámetros ($1, $2...), nunca se concatena texto del usuario en el SQL previene inyección SQL. Se usa además helmet y cors como middlewares de seguridad adicionales.