const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => res.json({ status: 'ok', service: 'ms-auth' }));
app.get('/', (req, res) => res.json({ service: 'ms-auth', version: '1.0.0' }));

// RUTAS
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app); 

app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada en ms-auth" });
});

module.exports = app;