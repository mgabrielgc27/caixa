import React from 'react'
import Menu from '../../layout/menuNav'
import Header from '../../components/atomos/header'
import FormCadastroPergunta from '../../components/organismos/formCadastroPergunta'
import PerguntasTable from '../../components/organismos/perguntasTable'
import { useState, useEffect } from 'react'
import { inicializarPerguntasDefault, verificarInputs } from '../../service/perguntas'

export default function perguntas() {

    const dificuldades = [
        'FÁCIL', 'INTERMEDIÁRIO', 'DIFÍCIL'
    ]

    const categorias = [
        'Matemática', 'Português', 'Conhecimentos Gerais'
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
    const [isAdicionandoPergunta, setIsAdicionandoPergunta] = useState(false)

    useEffect(() => {
        const perguntas = JSON.parse(localStorage.getItem('listaPerguntas'))
        if (perguntas) {
            setListaPerguntas(perguntas)
        }
    }, [])

    useEffect(() => {
        if (!listaPerguntas || listaPerguntas.length != 0) {
            localStorage.setItem('listaPerguntas', JSON.stringify(listaPerguntas))
        }
    }, [listaPerguntas])

    useEffect(() => {

        setAlternativas([alternativa1.toUpperCase(), alternativa2.toUpperCase(), alternativa3.toUpperCase(), alternativa4.toUpperCase()])
    }, [alternativa1, alternativa2, alternativa3, alternativa4])

    function cadastrarPergunta() {
        setIsAdicionandoPergunta(false)

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

    const cancelar = () => {
        setIsAdicionandoPergunta(false)
    }

    const excluirPergunta = (pergunta) => {
        console.log('excluir', pergunta)
        const perguntas = listaPerguntas.filter(l => l.pergunta != pergunta)
        setListaPerguntas(perguntas)
    }

    const editarPergunta = (pergunta) => {
        setIsAdicionandoPergunta(true)
        console.log('editar', pergunta)
        const p = listaPerguntas.find(l => l.pergunta === pergunta)
        setPergunta(p.pergunta)
        setAlternativa1(p.alternativas[0])
        setAlternativa2(p.alternativas[1])
        setAlternativa3(p.alternativas[2])
        setAlternativa4(p.alternativas[3])
        setResposta(p.resposta)
        setCategoria(p.categoria)
        setDificuldade(p.dificuldade)
        excluirPergunta(p.pergunta)
    }

    const adicionarPerguntas = () => {
        console.log('oi')
        setIsAdicionandoPergunta(true)
    }

    return (
        <div>
            <Menu />
            <div className='container'>
                <Header
                    titulo='Cadastro de perguntas'
                    icone='fa-solid fa-question' />

                {isAdicionandoPergunta && <div className='row'>

                    <FormCadastroPergunta
                        pergunta={pergunta}
                        setPergunta={setPergunta}
                        alternativa1={alternativa1}
                        alternativa2={alternativa2}
                        alternativa3={alternativa3}
                        alternativa4={alternativa4}
                        setAlternativa1={setAlternativa1}
                        setAlternativa2={setAlternativa2}
                        setAlternativa3={setAlternativa3}
                        setAlternativa4={setAlternativa4}
                        alternativas={alternativas}
                        resposta={resposta}
                        setResposta={setResposta}
                        categoria={categoria}
                        categorias={categorias}
                        setCategoria={setCategoria}
                        dificuldade={dificuldade}
                        dificuldades={dificuldades}
                        setDificuldade={setDificuldade}
                        cadastrarPergunta={cadastrarPergunta}
                        cancelar={cancelar} />

                </div>}

                <div className='row'>

                    <PerguntasTable
                        listaPerguntas={listaPerguntas}
                        excluirPergunta={excluirPergunta}
                        editarPergunta={editarPergunta}
                        setIsAdicionandoPergunta={setIsAdicionandoPergunta}
                        adicionarPerguntas={adicionarPerguntas} />

                </div>

            </div>
        </div>
    )
}