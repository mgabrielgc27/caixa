import React from 'react'
import Menu from '../../layout/menuNav'
import Header from '../../components/header'
import Input from '../../components/input'
import Select from '../../components/select'
import Button from '../../components/button'
import Table from '../../components/table'
import { useState, useEffect } from 'react'

export default function perguntas() {

    const dificuldades = [
        'Fácil', 'Intermédiario', 'Difícil'
    ]

    const [listaPerguntas, setListaPerguntas] = useState([])
    const [pergunta, setPergunta] = useState('')
    const [alternativa1, setAlternativa1] = useState('')
    const [alternativa2, setAlternativa2] = useState('')
    const [alternativa3, setAlternativa3] = useState('')
    const [alternativa4, setAlternativa4] = useState('')
    const [resposta, setResposta] = useState('')
    const [dificuldade, setDificuldade] = useState('')

    useEffect(() => {
      const perguntas = JSON.parse(localStorage.getItem('listaPerguntas'))
      if(perguntas){
        setListaPerguntas(perguntas)
      }
    }, [])
    

    function cadastrarPergunta() {
        
        if (!pergunta) {
            alert('Digite uma pergunta válida')
            return
        }

        if (!alternativa1) {
            alert('Digite a primeira alternativa')
            return
        }

        if (!alternativa2) {
            alert('Digite a segunda alternativa')
            return
        }

        if (!alternativa3) {
            alert('Digite a terceira alternativa')
            return
        }

        if (!alternativa4) {
            alert('Digite a quarta alternativa')
            return
        }

        if (!resposta) {
            alert('Digite uma resposta')
            return
        }

        if (!dificuldade) {
            alert('Escolha uma dificuldade')
            return
        }

        if (listaPerguntas.filter(l => l.pergunta == pergunta).length > 0) {
            alert('Pergunta ja existe')
            return
        }

        const alternativas = [alternativa1, alternativa2, alternativa3, alternativa4];

        if(alternativas.filter(a => a === alternativa1).length > 1){
            alert('Alternativa ja existe')
            return
        }

        if(alternativas.filter(a => a === alternativa2).length > 1){
            alert('Alternativa ja existe')
            return
        }

        if(alternativas.filter(a => a === alternativa3).length > 1){
            alert('Alternativa ja existe')
            return
        }

        if(alternativas.filter(a => a === alternativa4).length > 1){
            alert('Alternativa ja existe')
            return
        }

        if (!alternativas.find(a => a === resposta)) {
            alert('Resposta não confere com as alternativas')
            return
        }

        const listaPerguntasTemp = listaPerguntas

        listaPerguntasTemp.push({
            pergunta: pergunta,
            alternativas: alternativas,
            resposta: resposta,
            dificuldade: dificuldade
        })

        setListaPerguntas(listaPerguntasTemp)
        localStorage.setItem('listaPerguntas', JSON.stringify(listaPerguntas))
        alert('Pergunta cadastrada')
        setPergunta('')
        setAlternativa1('')
        setAlternativa2('')
        setAlternativa3('')
        setAlternativa4('')
        setResposta('')
        setDificuldade('')
    }

    return (
        <div>
            <Menu />
            <div className='container'>
                <Header
                    titulo='Cadastro de perguntas'
                    icone='fa-solid fa-question' />

                <div className='row'>

                    <div className='col-lg-8'>

                        <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                            <Input
                                Nome='Pergunta'
                                Id='pergunta'
                                value={pergunta}
                                placeholder='Ex: 2 + 2 é igual a?'
                                onChange={e => setPergunta(e.target.value)} />

                            <div className='d-flex'>
                                <Input
                                    Nome='Alternativa 1'
                                    Id='alternativa-1'
                                    value={alternativa1}
                                    placeholder='Ex: Três'
                                    onChange={e => setAlternativa1(e.target.value)} />
                                <Input
                                    Nome='Alternativa 2'
                                    Id='alternativa-2'
                                    value={alternativa2}
                                    placeholder='Ex: Um'
                                    onChange={e => setAlternativa2(e.target.value)} />
                                <Input
                                    Nome='Alternativa 3'
                                    Id='alternativa-3'
                                    value={alternativa3}
                                    placeholder='Ex: Quatro'
                                    onChange={e => setAlternativa3(e.target.value)} />
                                <Input
                                    Nome='Alternativa 4'
                                    Id='alternativa-4'
                                    value={alternativa4}
                                    placeholder='Ex: Vinte e dois'
                                    onChange={e => setAlternativa4(e.target.value)} />
                            </div>

                            <Input
                                Nome='Resposta correta'
                                Id='resposta-correta'
                                value={resposta}
                                placeholder='Ex: Quatro'
                                onChange={e => setResposta(e.target.value)} />

                            <Select
                                Nome="Selecionar dificuldade"
                                Id="selecionar-dificuldade"
                                value={dificuldade}
                                primeiroValor='Escolha a dificuldade'
                                opções={dificuldades}
                                onChange={e => setDificuldade(e.target.value)} />

                            <div className='d-flex flex-column pt-4'>
                                <Button
                                    tipoBotao="btn btn-success"
                                    onClick={cadastrarPergunta}>
                                    Cadastrar Pergunta
                                </Button>

                            </div>

                        </div>

                    </div>

                    <div className='col-lg-4'>
                        <div>
                            <h4 className='text-center text-dark'>Quantidade de perguntas</h4>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>Dificuldade</th>
                                        <th>Quantidade</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Fácil</td>
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'Fácil').length}</td>
                                    </tr>
                                    <tr>
                                        <td>Intermédiario</td>
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'Intermédiario').length}</td>
                                    </tr>
                                    <tr>
                                        <td>Díficil</td>
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'Difícil').length}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
