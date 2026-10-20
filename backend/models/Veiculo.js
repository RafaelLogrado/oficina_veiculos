const { DataTypes } = require("sequelize")
const db = require('../db/conn')

const Veiculo = db.define('veiculo', {
    codVeiculo: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    modelo: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    placa: {
        type: DataTypes.STRING(8),
        allowNull: false
    },
    codRastreador: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    codCliente: {
        type: DataTypes.INTEGER,
        references: {
            model: 'clientes',
            key: 'codCliente'
        }
    }
},{
    timestamps: false,
    tableName: 'veiculos'
})

module.exports = Veiculo