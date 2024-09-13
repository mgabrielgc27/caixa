import { realizarOperação } from "./banco"

export const cadastrarCliente = (listaClientes, nomeCliente, historico, tiposOperação) => {

    const listaFiltrada = listaClientes.filter(lista => lista.nome == nomeCliente)
    if (listaFiltrada.length > 0) {
        throw new Error('Usuário existente');
        
    }

    if (!nomeCliente) {
        throw new Error('Digite um nome válido');
    }

    const clientes = listaClientes

    clientes.push({
        nome: nomeCliente
    })

    const historicoTemp = realizarOperação(historico, nomeCliente, tiposOperação[2].valor, 1000, tiposOperação, '')

    return {
        historicoTemp,
        clientes
    }
}

export const deletar = (nome, listaClientes, historico, pontuaçãoParticipantes) => {
    const clientes  = listaClientes.filter(c => c.nome != nome);
    const hist = historico.filter(h => h.cliente != nome)
    const pontuação = pontuaçãoParticipantes.filter(p => p.nome != nome)

    return {
        clientes,
        hist,
        pontuação
    };
}