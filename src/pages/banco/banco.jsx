import React from 'react'
import { useState, useEffect } from 'react'
import Input from '../../components/input'
import Table from '../../components/table'
import Button from '../../components/button'
import Select from '../../components/select'
import Header from '../../components/header'
import Menu from '../../layout/menuNav'
import { calcularSaldo, filtrarHistoricoPorData, verificarInputs, cancelarOperação } from '../../service/banco'

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

  function realizarOperação() {

    try {
      const saldo = calcularSaldo(historico.filter(h => h.cliente == seleçãoNome))

      verificarInputs(saldo, valorOperação, setValorOperação, tipoOperação)

      const historicoTemp = historico

      historicoTemp.push({
        cliente: seleçãoNome,
        data: new Date(),
        tipo: tipoOperação,
        valor: valorOperação
      })

      if (tipoOperação == 'TD') {
        historicoTemp.push({
          cliente: seleçãoUsuarioTransferir,
          data: new Date(),
          tipo: tiposOperação[3].valor,
          valor: valorOperação
        })
      }

      setHistorico(historicoTemp)
      localStorage.setItem('historico', JSON.stringify(historico))
      setValorOperação('')

    } catch (error) {
      alert(error.message);
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

            <div className='col-lg-4'>

              <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                <h3 className='text-center'>Transações</h3>

                {listaClientes.length > 0 && <div className='container my-3'>
                  <Select
                    Nome="Selecionar cliente"
                    Id="selecionar-cliente"
                    value={seleçãoNome}
                    primeiroValor='Escolha o usuário'
                    opções={listaClientes}
                    onChange={e => setSeleçãoNome(e.target.value)} />

                  {seleçãoNome != '' && <div className='d-flex justify-content-center align-items-center p-2 my-3 text-white rounded shadow-sm bg-primary'>
                    <h5>Saldo do cliente: {calcularSaldo(historico.filter(h => h.cliente == seleçãoNome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h5>
                  </div>}
                </div>}


                {seleçãoNome != '' && <div className='container my-3'>
                  <Select
                    Nome="Tipo de Operação"
                    Id="tipo-operação"
                    value={tipoOperação}
                    opções={tiposOperação.filter(o => o.valor != 'VI' && o.valor != 'TC' && o.valor != 'CP')}
                    primeiroValor='Escolha um tipo de operação'
                    onChange={e => setTipoOperação(e.target.value)} />
                </div>}

                {tipoOperação == 'TD' && <div className='container my-3'>
                  <Select
                    Nome="Transferir para qual usuário"
                    Id="selecionar-cliente"
                    value={seleçãoUsuarioTransferir}
                    opções={listaClientes.filter(l => l.nome != seleçãoNome)}
                    primeiroValor='Escolha o usuário que receberá a transferência'
                    onChange={e => setSeleçãoUsuarioTransferir(e.target.value)} />
                </div>}

                {seleçãoNome != '' && <>
                  {tipoOperação && <Input
                    Nome={tipoOperação == 'SQ' ? 'Saque' : tipoOperação == 'DP' ? 'Depósito' : 'Transferência'}
                    Id={tipoOperação == 'SQ' ? 'saque' : tipoOperação == 'DP' ? 'deposito' : 'transferencia'}
                    value={valorOperação}
                    placeholder=
                    {tipoOperação == 'SQ' ? 'Digite o valor do saque' : tipoOperação == 'DP' ? 'Digite o valor do depósito' : 'Digite o valor da transferência'}
                    onChange={e => setValorOperação(e.target.value)} />}


                  {tipoOperação && <div className='d-flex flex-column'>
                    <Button
                      tipoBotao={tipoOperação == 'DP' ? "btn btn-success" : "btn btn-danger"}
                      onClick={realizarOperação}>
                      {tipoOperação == 'SQ' ? 'Sacar' : tipoOperação == 'DP' ? 'Depositar' : 'Transferir'}
                    </Button>

                    <Button
                      tipoBotao="btn btn-outline-danger"
                      onClick={() => cancelarOperação(setTipoOperação, setValorOperação)}>
                      Cancelar
                    </Button>
                  </div>}

                </>}

              </div>

            </div>

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
                            <th>Tipo</th>
                            <th>Valor</th>
                          </tr>
                        </thead>
                        <tbody>
                          {transações.map((t, index) => (
                            <tr key={index}>
                              <td>{t.tipo == 'DP' ?
                                tiposOperação[0].rotulo :
                                t.tipo == 'SQ' ?
                                  tiposOperação[1].rotulo :
                                  t.tipo == 'VI' ?
                                    tiposOperação[2].rotulo :
                                    t.tipo == 'TC' ?
                                      tiposOperação[3].rotulo :
                                      t.tipo == 'TD' ?
                                        tiposOperação[4].rotulo : tiposOperação[5].rotulo}
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