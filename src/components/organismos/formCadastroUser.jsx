import React from 'react'
import Button from '../../components/button'
import Input from '../../components/input'

export default function formCadastroUser(params) {
    return (
        <div className='col-lg-5'>

            <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                <h3 className='text-center'>Cadastro de Cliente</h3>

                <Input
                    Nome='Nome cliente'
                    Id='nome-cliente'
                    value={params.nomeCliente}
                    placeholder='Digite o nome do cliente'
                    onChange={e => params.setNomeCliente(e.target.value)} />

                <div className='d-flex flex-column'>
                    <Button
                        tipoBotao="btn btn-success"
                        onClick={params.salvarCliente}>
                        Cadastrar
                    </Button>
                </div>

            </div>

        </div>
    )
}
