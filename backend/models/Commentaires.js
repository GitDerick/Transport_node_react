// models/Commentaire.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Config/DatabaseDB');

const Commentaire = sequelize.define('Commentaire', {
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    commentaire: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Commentaire;
