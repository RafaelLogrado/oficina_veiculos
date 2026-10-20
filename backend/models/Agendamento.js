const { DataTypes } = require("sequelize")
const db = require('../db/conn')

const Agendamento = db.define('agendamento', {
    codAgendamento: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    data: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    hora: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tipo: {
        type: DataTypes.ENUM('REVISAO', 'MANUTENCAO', 'INSTALACAO'),
        allowNull: false
    },
    codVeiculo: {
        type: DataTypes.INTEGER,
        references: {
            model: 'veiculos',
            key: 'codVeiculo'
        }
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
    tableName: 'agendamentos'
})

module.exports = Agendamento