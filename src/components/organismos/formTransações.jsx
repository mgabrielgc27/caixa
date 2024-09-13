import React from 'react'
import Input from '../../components/atomos/input'
import Button from '../../components/atomos/button'
import Select from '../../components/atomos/select'
import { calcularSaldo, cancelarOperação } from '../../service/banco'

export default function formTransações(params) {
    const {
        listaClientes, 
        seleçãoNome, 
        tipoOperação, 
        tiposOperação,
        seleçãoUsuarioTransferir, 
        valorOperação,
        historico, 
        setSeleçãoNome, 
        setTipoOperação, 
        setSeleçãoUsuarioTransferir, 
        setValorOperação, 
        cadastrarOperação} = params

    return (
        <div className='col-lg-4'>

            <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                <h3 className='text-center'>Transações</h3>

                {listaClientes.length > 0 && <div className='container my-2'>
                    <Select
                        Nome="Selecionar cliente"
                        Id="selecionar-cliente"
                        value={seleçãoNome}
                        primeiroValor='Escolha o usuário'
                        opções={listaClientes}
                        onChange={e => setSeleçãoNome(e.target.value)} />

                    {seleçãoNome != '' && <div className='d-flex justify-content-center align-items-center p-2 my-2 text-white rounded shadow-sm bg-primary'>
                        <h5>Saldo do cliente: {calcularSaldo(historico.filter(h => h.cliente == seleçãoNome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h5>
                    </div>}
                </div>}


                {seleçãoNome != '' && <div className='container my-2'>
                    <Select
                        Nome="Tipo de Operação"
                        Id="tipo-operação"
                        value={tipoOperação}
                        opções={tiposOperação.filter(o => o.valor != 'VI' && o.valor != 'TC' && o.valor != 'CP')}
                        primeiroValor='Escolha um tipo de operação'
                        onChange={e => setTipoOperação(e.target.value)} />
                </div>}

                {tipoOperação == 'TD' && <div className='container my-2'>
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
                            onClick={cadastrarOperação}>
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
    )
}
