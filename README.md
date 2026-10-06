# Sistema de Reserva de Espacios Universitarios

Taller Evaluado 2 · Desarrollo de Frontend con React
Desarrollo Web y Móvil · Segundo Semestre 2026

## Integrantes

- Manuel Macchiavello
- Dhylan Pizarro
- Gabriel Hidalgo

## Descripción de la problemática

Consultar qué salas, laboratorios y auditorios hay disponibles, y reservarlos, no es un proceso ágil ni visible: se arriesgan cruces de horario y no queda un comprobante de la reserva. Esta aplicación permite ver los espacios, reservar un horario libre y gestionar las reservas propias, todo desde una interfaz web responsive.

## Usuarios objetivo

Estudiantes y personal de la universidad que necesitan salas, laboratorios, auditorios y boxes de estudio.

## Funcionalidades principales

- Inicio de sesión con validación de correo y clave (la clave se compara con un hash bcrypt).
- Rutas protegidas: solo se accede a las vistas con sesión iniciada.
- Catálogo de 9 espacios con tipo, edificio, piso, capacidad y descripción.
- Reserva mediante un modal con validaciones: nombre, correo, fecha no pasada y horario.
- Los horarios ocupados o que ya pasaron aparecen deshabilitados; no se puede reservar dos veces la misma sala en la misma fecha y horario.
- Vista "Mis reservas" con cancelación individual, "Cancelar todas" y contador en la navbar.
- Código QR descargable por cada reserva, generado con una API pública.
- Las reservas persisten al recargar la página (localStorage).
- Diseño responsive con menú colapsable en móvil.

## Tecnologías utilizadas

- React 19 y Vite
- React Router (rutas y rutas protegidas)
- Bootstrap 5 y CSS propio
- JavaScript (JSX), Fetch API
- bcryptjs (verificación de clave)
- SweetAlert2 (alertas y confirmaciones)
- JSON y localStorage / sessionStorage para datos locales (sin backend)
- Git, GitHub y Git Flow

## Instrucciones para ejecutar el proyecto

Requisitos: Node.js 20.19 o superior y npm.

```bash
git clone https://github.com/Manuel170923/Taller-2---8568
cd Taller-2---8568
npm install
npm run dev
```

Luego abrir la dirección que muestra la terminal (normalmente http://localhost:5173).

Otros comandos:

```bash
npm run build     # genera la versión de producción
npm run preview   # previsualiza la versión de producción
npm run lint      # revisa el código con ESLint
```

Usuarios de prueba:

| Correo | Clave |
| --- | --- |
| dhylan@unab.cl | Unab2026 |
| estudiante@unab.cl | Unab2026 |

Para generar el hash de una nueva clave: `node scripts/generarHash.js MiClave123`

## Estructura general de la aplicación

```
src/
├── components/   Navbar, Layout, RoomList, RoomCard,
│                 ReservationModal, QRReserva, RutaProtegida
├── pages/        Login, Salas, MisReservas
├── context/      AuthContext, ReservasContext
├── services/     authService, reservasStorage
├── data/         rooms.json, horarios.json, usuarios.json
├── utils/        fechas.js
├── styles/       styles.css, auth.css, reservas.css
├── App.jsx       definición de rutas
└── main.jsx      punto de entrada y proveedores de contexto
```

- `App.jsx` solo define las rutas; la lógica vive en contextos y servicios.
- `AuthContext` gestiona la sesión y `ReservasContext` gestiona las reservas.
- Los datos iniciales están en archivos JSON; los cambios se guardan en el navegador.

## API pública utilizada

- **Nombre:** goQR.me (QR Server), generador de códigos QR.
- **Documentación oficial:** https://goqr.me/api/doc/create-qr-code/
- **Endpoint:** `https://api.qrserver.com/v1/create-qr-code/`
- **Método HTTP:** GET
- **Parámetros:** `size`, `margin`, `format=png` y `data` (texto codificado con `encodeURIComponent`).
- **Datos que se usan de la respuesta:** la imagen PNG del código QR (no devuelve JSON).
- **Dónde se muestra:** en "Mis reservas", como miniatura de 80×80 en cada reserva y como imagen de 300×300 en un popup con botón de descarga.
- **Contenido del QR:** `RESERVA:<id>|<sala>|<fecha>|<horario>|<nombre>`
- **Si la API falla:** al descargar, si el `fetch` falla se abre la imagen en una pestaña nueva.
- **Restricciones:** no requiere clave ni registro; su uso está sujeto a los términos de servicio de goQR.me.

### Justificación funcional de la API

Cada reserva necesita un comprobante. El QR identifica de forma única la reserva (id, sala, fecha, horario y nombre) y puede escanearse o descargarse, lo que agrega valor real al problema y no solo cumple el requisito.

## Limitaciones conocidas

- No hay backend: las reservas se guardan en el navegador (localStorage), por lo que no se comparten entre usuarios ni dispositivos.
- Los usuarios y sus claves hasheadas están en el cliente: sirve para simular el inicio de sesión, no ofrece seguridad real.
- La disponibilidad mostrada en las tarjetas de salas es fija; solo el selector de horario detecta reservas ocupadas.
- Los filtros por edificio, sala y buscador, presentes en el diseño, no están implementados.
- El QR depende de un servicio externo y la miniatura no tiene respaldo si la API no responde.
