const sequelize = require('./Config/DatabaseDB');
const User = require('./models/User')
const Admin = require('./models/Admin')
const Chauffeur = require('./models/Chauffeurs')

sequelize.sync({ force: true }).then(() => {
  console.log('Database & tables created!');
}).catch(err => {
  console.error('Unable to sync database:', err);
});