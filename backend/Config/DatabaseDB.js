const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('alpha_transport','root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;

// {
//     "first_name": "John",
//     "last_name": "Doe",
//     "email": "john.doe@example.com",
//     "password": "securepassword",
//     "phone_number": "1234567890"
//   }
