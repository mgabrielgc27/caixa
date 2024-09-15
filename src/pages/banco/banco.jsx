import React from 'react'
import { useState, useEffect } from 'react'
import Header from '../../components/atomos/header'
import Menu from '../../layout/menuNav'
import FormTransações from '../../components/organismos/formTransações'
import HistoricoTable from '../../components/organismos/historicoTable'
import { calcularSaldo, verificarInputs, realizarOperação } from '../../service/banco'

export default function banco() {

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
  const [seleçãoNome, setSeleçãoNome] = useState('')
  const [tipoOperação, setTipoOperação] = useState('')
  const [seleçãoUsuarioTransferir, setSeleçãoUsuarioTransferir] = useState('')
  const [valorOperação, setValorOperação] = useState('')

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

  useEffect(() => {

    setValorOperação('')
  }, [tipoOperação])

  function cadastrarOperação() {

    try {
      const saldo = calcularSaldo(historico.filter(h => h.cliente == seleçãoNome))

      verificarInputs(saldo, valorOperação, seleçãoUsuarioTransferir, tipoOperação)

      const historicoTemp = realizarOperação(historico, seleçãoNome, tipoOperação, valorOperação, tiposOperação, seleçãoUsuarioTransferir)

      setHistorico(historicoTemp)
      localStorage.setItem('historico', JSON.stringify(historico))

    } catch (error) {
      alert(error.message);
    } finally {
      setValorOperação('')
    }

  }

  return (
    <div className=''>

      <Menu />

      <div className='container'>

        <Header
          titulo='Caixa Eletrônico'
          icone='fa-solid fa-building-columns' />

        <div className='container'>

          <div className='row'>

            <FormTransações
              listaClientes={listaClientes}
              seleçãoNome={seleçãoNome}
              tipoOperação={tipoOperação}
              tiposOperação={tiposOperação}
              valorOperação={valorOperação}
              seleçãoUsuarioTransferir={seleçãoUsuarioTransferir}
              historico={historico}
              setSeleçãoNome={setSeleçãoNome}
              setTipoOperação={setTipoOperação}
              setSeleçãoUsuarioTransferir={setSeleçãoUsuarioTransferir}
              setValorOperação={setValorOperação}
              cadastrarOperação={cadastrarOperação} />    

            <HistoricoTable
              seleçãoNome={seleçãoNome}
              historico={historico}
              tiposOperação={tiposOperação} />

          </div>
        </div>
      </div>
    </div>
  )
}