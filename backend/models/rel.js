const Cliente = require('./Cliente')
const Veiculo = require('./Veiculo')
const Agendamento = require('./Agendamento')

Cliente.hasMany(Veiculo, {
    foreignKey: 'codCliente',
    as: "veiculoCliente",
    onDelete: 'CASCADE'
})

Veiculo.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: "clienteVeiculo"
})


Cliente.hasMany(Agendamento, {
    foreignKey: 'codCliente',
    as: "agendamentoCliente",
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Cliente, {
    foreignKey: 'codCliente',
    as: "clienteAgendamento"
})


Veiculo.hasMany(Agendamento, {
    foreignKey: 'codVeiculo',
    as: "agendamentoVeiculo",
    onDelete: 'CASCADE'
})

Agendamento.belongsTo(Veiculo, {
    foreignKey: 'codVeiculo',
    as: 'veiculoAgendamento'
})


module.exports = { Cliente, Veiculo, Agendamento }