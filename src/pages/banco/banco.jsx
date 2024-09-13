import React from 'react'
import { useState, useEffect } from 'react'
import Table from '../../components/atomos/table'
import Header from '../../components/atomos/header'
import Menu from '../../layout/menuNav'
import FormTransações from '../../components/organismos/formTransações'
import { calcularSaldo, filtrarHistoricoPorData, verificarInputs, realizarOperação } from '../../service/banco'

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

            {seleçãoNome != '' && <div className='col-lg-8'>
              <div style={{ maxHeight: '730px', maxHeight: '593.6px', overflowY: 'auto' }} className='row bg-white rounded-4 shadow-sm shadow w-220px p-3 ms-2'>
                <h1>Histórico de operações de {seleçãoNome}</h1>
                <div className='table-responsive'>
                  {filtrarHistoricoPorData(historico.filter(h => h.cliente == seleçãoNome)).slice().reverse().map(([data, transações]) => (
                    <div key={data}>
                      <h3>{data === new Date().toLocaleDateString() ? 'Hoje' : data}</h3>
                      <Table>
                        <thead>
                          <tr>
                            <th>Horário</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transações.map((t, index) => (
                            <tr key={index}>
                              <td>{t.horario}</td>
                              <td>{t.tipo == 'DP' ?
                                tiposOperação[0].rotulo :
                                t.tipo == 'SQ' ?
                                  tiposOperação[1].rotulo :
                                  t.tipo == 'VI' ?
                                    tiposOperação[2].rotulo :
                                    t.tipo == 'TC' ?
                                      tiposOperação[3].rotulo + ' de ' + t.remetente :
                                      t.tipo == 'TD' ?
                                        tiposOperação[4].rotulo + ' para ' + t.destinatario : tiposOperação[5].rotulo}
                              </td>
                              <td>{parseFloat(t.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ))
                  }
                </div>
              </div>
            </div>}

          </div>
        </div>
      </div>
    </div>
  )
}