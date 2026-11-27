# Próximo Paso — API REST

Backend de **Próximo Paso**, un organizador de búsqueda laboral. Gestiona usuarios, postulaciones, categorías y ofertas, y genera preparación de entrevistas con IA.

🔗 **API publicada:** https://dfs-obligatorio-api.vercel.app/v1
🔗 **Frontend:** [proximo-paso-front](https://github.com/MauroGuimaraes367440/proximo-paso-front) · [app publicada](https://proximo-paso-front.vercel.app)

## Stack

- Node.js + Express 5
- MongoDB + Mongoose
- Autenticación con JWT y contraseñas cifradas con bcrypt
- Validación de body, params y query con Joi
- Integraciones: **Groq** (IA generativa), **Jooble** (ofertas laborales) y **Cloudinary** (imágenes, subidas con Multer)
- Deploy en Vercel

## Arquitectura

Organizada en capas:

```
routes → middlewares (auth, rol, validación) → controllers → services → models
```

- Manejo centralizado de errores con códigos HTTP adecuados (400, 401, 403, 404, 409, 503).
- Autorización por rol (`usuario` / `admin`) y reglas de negocio por plan (`plus` / `premium`).
- CORS configurado solo para los orígenes del frontend.

## Endpoints (`/v1`)

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Login, devuelve token JWT |
| GET | `/postulaciones` | Listado paginado, filtrable por estado y categoría |
| GET | `/postulaciones/:id` | Detalle de una postulación |
| POST | `/postulaciones` | Crear postulación (respeta el límite del plan) |
| PATCH | `/postulaciones/:id` | Editar postulación |
| DELETE | `/postulaciones/:id` | Eliminar postulación |
| POST | `/postulaciones/:id/preparacion` | Generar preparación de entrevista con IA |
| GET | `/categorias` | Listado de categorías |
| GET | `/categorias/:id` | Detalle de una categoría |
| POST | `/categorias` | Crear categoría *(admin)* |
| PATCH | `/categorias/:id` | Renombrar categoría *(admin)* |
| DELETE | `/categorias/:id` | Eliminar categoría sin postulaciones *(admin)* |
| POST | `/categorias/:id/imagen` | Subir imagen de la categoría *(admin)* |
| GET | `/ofertas` | Buscar ofertas laborales reales (Jooble) |
| PATCH | `/usuarios/plan` | Cambiar de plan |

Todas las rutas salvo `/auth` requieren el header `Authorization: Bearer <token>`. Los endpoints se probaron con una colección de Postman.

## Cómo correrlo localmente

```bash
npm install
cp .env.example .env   # completar conexión a MongoDB, SECRET_KEY y claves de Groq, Jooble y Cloudinary
npm run dev
```

---

Proyecto realizado por **Mauro Guimaraes** para la materia Desarrollo Full Stack — Universidad ORT Uruguay.
