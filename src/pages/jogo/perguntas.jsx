import React from 'react'
import Menu from '../../layout/menuNav'
import Header from '../../components/header'
import Input from '../../components/input'
import Select from '../../components/select'
import { useState, useEffect } from 'react'

export default function perguntas() {

    const dificuldades = [
        'Fácil', 'Intermédiario', 'Difícil'
    ]

    const [perguntas, setPerguntas] = useState([])
    const [pergunta, setPergunta] = useState('')
    const [dificuldade, setDificuldade] = useState('')

    return (
        <div>
            <Menu />
            <div className='container'>
                <Header
                    titulo='Cadastro de perguntas'
                    icone='fa-solid fa-question' />

                <div className='row'>

                    <div className='col-lg-6'>

                        <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                            <Input
                                Nome='Pergunta'
                                Id='pergunta'
                                value={pergunta}
                                placeholder='Digite uma pergunta'
                                onChange={e => setPergunta(e.target.value)} />

                            <Select
                                Nome="Selecionar dificuldade"
                                Id="selecionar-dificuldade"
                                value={dificuldade}
                                primeiroValor='Escolha a dificuldade'
                                opções={dificuldades}
                                onChange={e => setDificuldade(e.target.value)} />

                        </div>

                    </div>

                    <div className='col-lg-6'>

                    </div>

                </div>
            </div>
        </div>
    )
}
