# Agenda Telefónica

Este proyecto es una **Agenda Telefónica** desarrollada como parte del curso FullStackOpen. Incluye un **backend** en Node.js/Express y un **frontend** en React.

## Demo

La aplicación está desplegada en:  
[https://short-gaudy-gazelle.glitch.me](https://short-gaudy-gazelle.glitch.me)

---

## Backend

Directorio: [`agendaTelefonica-backend`](agendaTelefonica-backend/index.js)

El backend está construido con **Node.js** y **Express**. Sus principales características son:

- Proporciona una API REST para gestionar personas (nombre y número de teléfono).
- Endpoints principales:
  - `GET /api/persons` — Lista todas las personas.
  - `GET /api/persons/:id` — Obtiene una persona por ID.
  - `POST /api/persons` — Agrega una nueva persona.
  - `DELETE /api/persons/:id` — Elimina una persona.
  - `GET /info` — Muestra información general y fecha.
- Usa **CORS** para permitir peticiones desde el frontend.
- Usa **Morgan** para el logging de solicitudes HTTP, mostrando el body en las peticiones POST.

### Ejecución local del backend

```bash
cd agendaTelefonica-backend
npm install
npm run dev
```

El backend por defecto corre en [http://localhost:3001](http://localhost:3001/).

---

## Frontend

Directorio: [`AgendaTelefonica-frontend`](AgendaTelefonica-frontend)

El frontend está desarrollado en **React** usando **Vite**. Sus principales características son:

- Permite listar, agregar, filtrar, actualizar y eliminar contactos.
- Consume la API REST del backend.
- Interfaz moderna y responsiva.

### Ejecución local del frontend

```bash
cd AgendaTelefonica-frontend
npm install
npm run dev
```

Por defecto, el frontend corre en [http://localhost:5173](http://localhost:5173) y realiza peticiones al backend desplegado en Glitch.

---

## URL del **Proyecto**

Puedes acceder a la aplicación en producción aquí:  
[https://short-gaudy-gazelle.glitch.me](https://short-gaudy-gazelle.glitch.me)