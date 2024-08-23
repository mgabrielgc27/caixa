import { useState, useEffect } from 'react'
import Input from './components/input'
import Table from './components/table'
import Button from './components/button'
import Select from './components/select'

function App() {


  const tiposOperação = [
    { rotulo: 'Depósito', valor: 'DP' },
    { rotulo: 'Saque', valor: 'SQ' },
    { rotulo: 'Valor inicial', valor: 'VI' }
  ]

  var saldo = 0;
  const [historico, setHistorico] = useState([])
  const [tipoOperação, setTipoOperação] = useState('')
  const [valorOperação, setValorOperação] = useState('')
  // const [saldo, setSaldo] = useState('1000') //remover

  function inicializar() {
    saldo = calcularSaldo()
    const historicoTemp = []

    historicoTemp.push({
      data: new Date().toLocaleString(),
      tipo: tiposOperação[2].rotulo,
      valor: '1000'
    })

    setHistorico(historicoTemp)
  }

  function calcularSaldo() {




    for (let index = 0; index < historico.length; index++) {
      if (historico[index].tipo != 'SQ') {
        saldo += parseFloat(historico[index].valor)
      } else {
        saldo -= parseFloat(historico[index].valor)
      }
    }



    return saldo
  }

  useEffect(() => {
    inicializar()
  }, [])

  useEffect(() => {

    setValorOperação('')
  }, [tipoOperação])

  function realizarOperação() {


    if (isNaN(valorOperação)) {
      alert('Valor inválido')
      setValorOperação('')
      return
    }

    if (valorOperação <= 0) {
      alert('Digite um valor válido')
      setValorOperação('')
      return
    }

    if (tipoOperação == 'SQ' && valorOperação > saldo) {
      alert('Saque ultrapassou o valor do saldo, tente um valor menor')
      setValorOperação('')
      return
    }

    saldo = calcularSaldo();

    const historicoTemp = historico

    historicoTemp.push({
      data: new Date().toLocaleString(),
      tipo: tipoOperação,
      valor: valorOperação
    })

    setHistorico(historicoTemp)
    setValorOperação('')
  }

  return (
    <>
      <header style={{width: '70%'}} className='container text-center p-3 my-3 bg-primary text-white rounded-4 shadow-sm shadow w-220px'>
        <h1>Caixa Eletrônico</h1>
        <h2>Saldo: R${calcularSaldo().toFixed(2)}</h2>
      </header>
      
      <div className='container'>
        <div className='px-2'>
          <div style={{ width: "40%" }} className='container rounded-3 shadow w-220px px-2'>
            <div className='bg-light rounded-3'>
              
            </div>
            <Select
              Nome="Tipo de Operação"
              Id="tipo-operação"
              value={tipoOperação}
              opções={tiposOperação.filter(o => o.valor != 'VI')}
              onChange={e => setTipoOperação(e.target.value)} />

            <div className="d-flex gap-2 justify-content-center py-3">
              {tipoOperação == 'SQ' && <Input
                Nome="Saque"
                Id="saque"
                value={valorOperação}
                placeholder="Digite o valor do saque"
                onChange={e => setValorOperação(e.target.value)} />}

              {tipoOperação == 'DP' && <Input
                Nome="Depósito"
                Id="deposito"
                value={valorOperação}
                placeholder="Digite o valor do depósito"
                onChange={e => setValorOperação(e.target.value)} />}

              <div className='py-5'>
                {tipoOperação && <Button
                  tipoBotao="btn btn-danger"
                  onClick={realizarOperação}>
                  {tipoOperação == 'SQ' ? 'Sacar' : 'Depositar'}
                </Button>}
              </div>

            </div>

          </div>

          <div className='container px-5'>
            <div>
              <h1 className='text-center'>Histórico</h1>
              <Table>
                <thead>
                  <tr>
                    <th>Data</th>
                    <th>Tipo de Operação</th>
                    <th>Valor da Operação</th>
                  </tr>
                </thead>
                <tbody>
                  {historico.map(h => {
                    return (
                      <tr key={h.data}>
                        <td>{h.data}</td>
                        <td>{h.tipo == 'SQ' ? tiposOperação[1].rotulo : tiposOperação[0].rotulo}</td>
                        <td>R${parseFloat(h.valor).toFixed(2)}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
