import { realizarOperação } from "./banco"

export const cadastrarCliente = (listaClientes, nomeCliente, historico, tiposOperação, setHistorico, setListaClientes, setNomeCliente) => {

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

    setHistorico(historicoTemp);
    setListaClientes(clientes)
    setNomeCliente('')
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes))
    localStorage.setItem('historico', JSON.stringify(historico))
    alert('Usuário cadastrado')

}