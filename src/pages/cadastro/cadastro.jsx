import { useState, useEffect } from 'react'
import Header from '../../components/atomos/header'
import Menu from '../../layout/menuNav'
import FormCadastroUser from '../../components/organismos/formCadastroUser'
import UsersTable from '../../components/organismos/usersTable'
import { cadastrarCliente, deletar } from '../../service/cadastro'

function Cliente() {

  const tiposOperação = [
    { rotulo: 'Depósito', valor: 'DP' },
    { rotulo: 'Saque', valor: 'SQ' },
    { rotulo: 'Valor inicial', valor: 'VI' },
    { rotulo: 'Transferência crédito', valor: 'TC' },
    { rotulo: 'Transferência débito', valor: 'TD' },
    { rotulo: 'Compra', valor: 'CP' }
  ]

  const [listaClientes, setListaClientes] = useState([])
  const [historico, setHistorico] = useState([])
  const [pontuaçãoParticipantes, setPontuaçãoParticipantes] = useState([])
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
    const pontos = JSON.parse(localStorage.getItem('pontuaçãoParticipantes'))
    if (pontos) {
      setPontuaçãoParticipantes(pontos)
    }
  }, [])

  useEffect(() => {
    if (!listaClientes || listaClientes.length != 0) {
      localStorage.setItem('listaClientes', JSON.stringify(listaClientes))
    }
  }, [listaClientes])

  useEffect(() => {
    if (!historico || historico.length != 0) {
      localStorage.setItem('historico', JSON.stringify(historico))
    }
  }, [historico])

  useEffect(() => {
    if (!pontuaçãoParticipantes || pontuaçãoParticipantes.length != 0) {
      localStorage.setItem('pontuaçãoParticipantes', JSON.stringify(pontuaçãoParticipantes))
    }
  }, [pontuaçãoParticipantes])


  const salvarCliente = () => {
    try {
      const result = cadastrarCliente(listaClientes, nomeCliente, historico, tiposOperação)
      setHistorico(result.historicoTemp);
      setListaClientes(result.clientes)
      setNomeCliente('')
      localStorage.setItem('listaClientes', JSON.stringify(listaClientes))
      localStorage.setItem('historico', JSON.stringify(historico))
    } catch (error) {
      alert(error.message)
    }
    alert('Usuário cadastrado')
  }

  const deletarCliente = (nome) => {
    const result = deletar(nome, listaClientes, historico, pontuaçãoParticipantes);
    setListaClientes(result.clientes)
    setHistorico(result.hist)
    setPontuaçãoParticipantes(result.pontuação)
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
                historico={historico}
                deletar={deletarCliente} />
            }

          </div>

        </div>
      </div>
    </div>
  )
}

export default Cliente