import { useState, useEffect } from 'react'
import Header from '../../components/atomos/header'
import Menu from '../../layout/menuNav'
import FormCadastroUser from '../../components/organismos/formCadastroUser'
import UsersTable from '../../components/organismos/usersTable'
import { cadastrarCliente } from '../../service/cadastro'

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

  const salvarCliente = () => {
    try {
      cadastrarCliente(listaClientes, nomeCliente, historico, tiposOperação, setHistorico, setListaClientes, setNomeCliente)
    } catch (error) {
      alert(error.message)
    }
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

            <FormCadastroUser
              nomeCliente={nomeCliente}
              setNomeCliente={setNomeCliente}
              salvarCliente={salvarCliente} />

            {listaClientes.length > 0 &&
              <UsersTable
                listaClientes={listaClientes}
                historico={historico} />
            }

          </div>
          
        </div>
      </div>
    </div>
  )
}

export default Cliente
