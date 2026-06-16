const sequelize = require('../config/db');
const Terrain = require('./Terrain');
const ModeloML = require('./ModeloML');
const Factor = require('./Factor');
const Consulta = require('./Consulta');
const ConsultaFactor = require('./ConsultaFactor');

// User NO está en ms-lands - está en ms-auth
// Las relaciones con User se manejan SOLO cuando se necesitan

// 1. Un Terreno se evalúa en muchas Consultas
Terrain.hasMany(Consulta, { foreignKey: 'terreno_id' });
Consulta.belongsTo(Terrain, { foreignKey: 'terreno_id' });

// 2. Una Consulta utiliza un ModeloML específico
ModeloML.hasMany(Consulta, { foreignKey: 'modelo_ml_id' });
Consulta.belongsTo(ModeloML, { foreignKey: 'modelo_ml_id' });

// 3. Una Consulta detalla varios Factores (Relación Muchos a Muchos)
Consulta.belongsToMany(Factor, {
  through: ConsultaFactor,
  foreignKey: 'consulta_id',
  otherKey: 'factor_id'
});

Factor.belongsToMany(Consulta, {
  through: ConsultaFactor,
  foreignKey: 'factor_id',
  otherKey: 'consulta_id'
});

const syncDatabase = async () => {
  try {
    await sequelize.query('CREATE EXTENSION IF NOT EXISTS postgis;');
    console.log('PostGIS: Extensión verificada/activada.');
    await sequelize.sync({ alter: true });
    console.log('Tablas sincronizadas correctamente.');
  } catch (error) {
    console.error('Error en syncDatabase:', error.message);
    throw error;
  }
};

module.exports = {
  Terrain,
  ModeloML,
  Factor,
  Consulta,
  ConsultaFactor,
  syncDatabase,
  sequelize
};