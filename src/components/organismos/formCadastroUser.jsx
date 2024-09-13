import React from 'react'
import Button from '../atomos/button'
import Input from '../atomos/input'
import DivRoundedShadow from '../atomos/divRoundedShadow'

export default function formCadastroUser(params) {
    return (
        <div className='col-lg-5'>

            <DivRoundedShadow>

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

            </DivRoundedShadow>

        </div>
    )
}
