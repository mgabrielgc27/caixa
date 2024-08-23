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

  const [historico, setHistorico] = useState([])
  const [dataOperação, setDataOperação] = useState(new Date().toLocaleString())
  const [tipoOperação, setTipoOperação] = useState('')
  const [valorOperação, setValorOperação] = useState('')
  const [saldo, setSaldo] = useState('1000')

  function inicializar() {
    const historicoTemp = []

    historicoTemp.push({
      data: dataOperação,
      tipo: tiposOperação[2].rotulo,
      valor: '1000'
    })

    setHistorico(historicoTemp)
  }

  useEffect(() => {
    inicializar()
    console.log(historico)
  }, [])

  useEffect(() => {

    setValorOperação('')
  }, [tipoOperação])


  function sacar() {
    console.log('sacou')
    if(valorOperação == 0){
      alert('Digite um valor diferente de zero')
      setValorOperação('')
      return
    }
    if(valorOperação > saldo){
      alert('Saque ultrapassou o valor do saldo, tente um valor menor')
      setValorOperação('')
      return
    }

    
    setSaldo(saldo-valorOperação)
    setDataOperação(new Date().toLocaleString())

    const historicoTemp = historico

    historicoTemp.push({
      data: dataOperação,
      tipo: tiposOperação[1].rotulo,
      valor: valorOperação
    })

    setHistorico(historicoTemp)
    setValorOperação('')
  }

  function depositar() {
    console.log('depositou')
    if(valorOperação == 0){
      alert('Digite um valor diferente de zero')
      setValorOperação('')
      return
    }

    
    setSaldo(parseFloat(saldo)+parseFloat(valorOperação))
    setDataOperação(new Date().toLocaleString())

    const historicoTemp = historico

    historicoTemp.push({
      data: dataOperação,
      tipo: tiposOperação[0].rotulo,
      valor: valorOperação
    })

    setHistorico(historicoTemp)
    setValorOperação('')
  }

  return (
    <>
      <div className='bg-body-tertiary'>
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <h1 className='text-center'>Saldo = {saldo}</h1>

              <Select
                Nome="Tipo de Operação"
                Id="tipo-operação"
                value={tipoOperação}
                opções={tiposOperação.filter(o => o.valor != 'VI')}
                onChange={e => setTipoOperação(e.target.value)} />

              {tipoOperação == 'SQ' &&
                <div className="d-flex gap-2 justify-content-center py-5">

                  <Input
                    Nome=""
                    Id="saque"
                    value={valorOperação}
                    placeholder="Digite a quantidade do saque"
                    onChange={e => setValorOperação(e.target.value)} />



                  <Button
                    tipoBotao="btn btn-danger btn-sm"
                    onClick={sacar}>
                    Sacar
                  </Button>

                </div>}

              {tipoOperação == 'DP' &&

                <div className="d-flex gap-2 justify-content-center py-5">
                  <Input
                    Nome=""
                    Id="deposito"
                    value={valorOperação}
                    placeholder="Digite a quantidade do depósito"
                    onChange={e => setValorOperação(e.target.value)} />

                  <Button
                    tipoBotao="btn btn-danger btn-sm"
                    onClick={depositar}>
                    Depositar
                  </Button>
                </div>}

            </div>
            <div className='col-8'>
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
                        <td>{h.tipo}</td>
                        <td>{h.valor}</td>
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
