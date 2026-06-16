const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// 1. MIDDLEWARES
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. RUTAS DE DIAGNÓSTICO
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'ms-lands' }));
app.get('/', (req, res) => {
  res.status(200).json({ status: "online", service: "ms-lands", version: "1.0.0" });
});

// 3. CARGA DE RUTAS (SOLO las que corresponden a ms-lands)
// NOTA: auth.routes.js NO debe estar aquí (lo maneja ms-auth)
require('./routes/terrain.routes')(app);
require('./routes/user.routes')(app);
require('./routes/factor.routes')(app);
require('./routes/dashboard.routes')(app);

// 4. MANEJO DE 404
app.use((req, res) => {
  res.status(404).json({ message: "La ruta solicitada no existe en ms-lands." });
});

module.exports = app;