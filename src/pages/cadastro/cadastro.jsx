import { useState, useEffect } from 'react'
import Input from '../../components/input'
import Table from '../../components/table'
import Button from '../../components/button'
import Header from '../../components/header'
import Menu from '../../layout/menuNav'
import { calcularSaldo } from '../../service/banco'

function Cliente() {

  const tiposOperação = [
    { rotulo: 'Depósito', valor: 'DP' },
    { rotulo: 'Saque', valor: 'SQ' },
    { rotulo: 'Valor inicial', valor: 'VI' },
    { rotulo: 'Transferência crédito', valor: 'TC' },
    { rotulo: 'Transferência débito', valor: 'TD' },
    { rotulo: 'Compra', valor: 'CP'}
]

  const [listaClientes, setListaClientes] = useState([])
  const [historico, setHistorico] = useState([])
  const [nomeCliente, setNomeCliente] = useState('')

  useEffect(() => {
    const clientes = JSON.parse(localStorage.getItem('listaClientes'))
    if (clientes) {
      setListaClientes(clientes)
    }
    const hist = JSON.parse(localStorage.getItem('historico'))
    if (hist) {
      setHistorico(hist)
    }
  }, [])

  function cadastrarCliente() {

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
      data: new Date().toLocaleDateString(),
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

  return (
    <div className=''>

      <Menu />

      <div className='container'>

        <Header
          titulo='Cadastro de clientes'
          icone='fa-solid fa-users' />

        <div className='container'>

          <div className='row'>

            <div className='col-lg-5'>

              <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                <h3 className='text-center'>Cadastro de Cliente</h3>


                <Input
                  Nome='Nome cliente'
                  Id='nome-cliente'
                  value={nomeCliente}
                  placeholder='Digite o nome do cliente'
                  onChange={e => setNomeCliente(e.target.value)} />

                <div className='d-flex flex-column'>
                  <Button
                    tipoBotao="btn btn-success"
                    onClick={cadastrarCliente}>
                    Cadastrar
                  </Button>

                </div>

              </div>

            </div>

            {listaClientes.length > 0 && <div className='col-lg-7'>
              <div>
                <Table>
                  <thead>
                    <tr>
                      <th>Clientes</th>
                      <th>Saldo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listaClientes.map(l => {
                      return (
                        <tr key={l.nome}>
                          <td>{l.nome}</td>
                          <td>{calcularSaldo(historico.filter(h => h.cliente == l.nome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Cliente
