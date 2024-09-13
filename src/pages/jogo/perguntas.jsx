import React from 'react'
import Menu from '../../layout/menuNav'
import Header from '../../components/header'
import Input from '../../components/input'
import Select from '../../components/select'
import Button from '../../components/button'
import Table from '../../components/table'
import { useState, useEffect } from 'react'
import { inicializarPerguntasDefault, verificarInputs } from '../../service/perguntas'

export default function perguntas() {

    const dificuldades = [
        'FÁCIL', 'INTERMEDIÁRIO', 'DIFÍCIL'
    ]

    const categorias = [
        'Matemática', 'Português', 'Ciências', 'Sociologia', 'Geografia', 'Conhecimentos Gerais', 'Filmes/Desenhos'
    ]

    const [listaPerguntas, setListaPerguntas] = useState([])
    const [pergunta, setPergunta] = useState('')
    const [alternativa1, setAlternativa1] = useState('')
    const [alternativa2, setAlternativa2] = useState('')
    const [alternativa3, setAlternativa3] = useState('')
    const [alternativa4, setAlternativa4] = useState('')
    const [alternativas, setAlternativas] = useState([])
    const [resposta, setResposta] = useState('')
    const [dificuldade, setDificuldade] = useState('')
    const [categoria, setCategoria] = useState('')

    useEffect(() => {
        const perguntas = JSON.parse(localStorage.getItem('listaPerguntas'))
        if (perguntas) {
            setListaPerguntas(perguntas)
        }
    }, [])

    useEffect(() => {

        setAlternativas([alternativa1.toUpperCase(), alternativa2.toUpperCase(), alternativa3.toUpperCase(), alternativa4.toUpperCase()])
    }, [alternativa1, alternativa2, alternativa3, alternativa4])

    function cadastrarPergunta() {

        try {
            const alternativasTemp = alternativas;

            verificarInputs(pergunta, alternativas, alternativasTemp, resposta, categoria, dificuldade, listaPerguntas)

            const listaPerguntasTemp = listaPerguntas

            listaPerguntasTemp.push({
                pergunta: pergunta.toUpperCase(),
                alternativas: alternativasTemp,
                resposta: resposta.toUpperCase(),
                dificuldade: dificuldade,
                categoria: categoria,
                foiPerguntada: false
            })

            setListaPerguntas(listaPerguntasTemp)
            localStorage.setItem('listaPerguntas', JSON.stringify(listaPerguntas))
            alert('Pergunta cadastrada')
            setPergunta('')
            setAlternativas([])
            setResposta('')
            setDificuldade('')
            setCategoria('')
            setAlternativa1('')
            setAlternativa2('')
            setAlternativa3('')
            setAlternativa4('')

        } catch (error) {
            alert(error.message)
        }
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
                                    placeholder='Digite a alternativa 1'
                                    onChange={e => setAlternativa1(e.target.value)} />
                                <Input
                                    Nome='Alternativa 2'
                                    Id='alternativa-2'
                                    value={alternativa2}
                                    placeholder='Digite a alternativa 2'
                                    onChange={e => setAlternativa2(e.target.value)} />
                                <Input
                                    Nome='Alternativa 3'
                                    Id='alternativa-3'
                                    value={alternativa3}
                                    placeholder='Digite a alternativa 3'
                                    onChange={e => setAlternativa3(e.target.value)} />
                                <Input
                                    Nome='Alternativa 4'
                                    Id='alternativa-4'
                                    value={alternativa4}
                                    placeholder='Digite a alternativa 4'
                                    onChange={e => setAlternativa4(e.target.value)} />
                            </div>

                            {alternativas[0] != '' && alternativas[1] != '' && alternativas[2] != '' && alternativas[3] != '' && <Select
                                Nome="Selecionar resposta"
                                Id="selecionar-resposta"
                                value={resposta}
                                primeiroValor='Escolha a resposta'
                                opções={alternativas}
                                onChange={e => setResposta(e.target.value)} />}

                            <Select
                                Nome="Selecionar categoria"
                                Id="selecionar-categoria"
                                value={categoria}
                                primeiroValor='Escolha a categoria'
                                opções={categorias}
                                onChange={e => setCategoria(e.target.value)} />

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

                            {/*<div className='d-flex flex-column pt-4'>
                                <Button
                                    tipoBotao="btn btn-success"
                                    onClick={inicializarPerguntasDefault}>
                                    Cadastrar Perguntas Default
                                </Button>

                            </div>*/}

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
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'FÁCIL').length}</td>
                                    </tr>
                                    <tr>
                                        <td>Intermediário</td>
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'INTERMEDIÁRIO').length}</td>
                                    </tr>
                                    <tr>
                                        <td>Díficil</td>
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'DIFÍCIL').length}</td>
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