export const cadastrarCliente = (listaClientes, nomeCliente, historico, tiposOperação, setHistorico, setListaClientes, setNomeCliente) => {

    const listaFiltrada = listaClientes.filter(lista => lista.nome == nomeCliente)
    if (listaFiltrada.length > 0) {
        alert('Usuário existente')
        return
    }

    if (!nomeCliente) {
        alert('Digite um nome válido')
        return
    }

    const clientes = listaClientes

    clientes.push({
        nome: nomeCliente
    })

    const historicoTemp = historico

    historicoTemp.push({
        cliente: nomeCliente,
        data: new Date(),
        tipo: tiposOperação[2].valor,
        valor: 1000
    })

    setHistorico(historicoTemp);

    setListaClientes(clientes)
    setNomeCliente('')
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes))
    localStorage.setItem('historico', JSON.stringify(historico))
    alert('Usuário cadastrado')

}