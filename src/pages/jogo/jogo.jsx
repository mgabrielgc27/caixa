import React from 'react'
import { useState, useEffect } from 'react'
import Menu from '../../layout/menuNav';
import Select from '../../components/select';
import Button from '../../components/button';
import Header from '../../components/header';

export default function jogo() {

    const QUANT_PERGUNTAS_FACEIS = 5
    const QUANT_PERGUNTAS_INTERMEDIARIAS = 5
    const QUANT_PERGUNTAS_DIFICEIS = 5
    const RODADA_FACIL = 2
    const RODADA_INTERMEDIARIA = 4
    const RODADA_DIFICIL = 6

    const PONTOS = [
        { acertar: 1000, parar: 0, errar: 0 },
        { acertar: 2000, parar: 1000, errar: 500 },
        { acertar: 3000, parar: 2000, errar: 1000 },
        { acertar: 4000, parar: 3000, errar: 1500 },
        { acertar: 5000, parar: 4000, errar: 2000 },
        { acertar: 10000, parar: 5000, errar: 2500 },
        { acertar: 20000, parar: 10000, errar: 5000 },
        { acertar: 30000, parar: 20000, errar: 10000 },
        { acertar: 40000, parar: 30000, errar: 15000 },
        { acertar: 50000, parar: 40000, errar: 20000 },
        { acertar: 100000, parar: 50000, errar: 25000 },
        { acertar: 200000, parar: 100000, errar: 50000 },
        { acertar: 300000, parar: 200000, errar: 100000 },
        { acertar: 400000, parar: 300000, errar: 150000 },
        { acertar: 500000, parar: 400000, errar: 200000 },
        { acertar: 1000000, parar: 500000, errar: 0 }
    ]

    const tiposOperação = [
        { rotulo: 'Depósito', valor: 'DP' },
        { rotulo: 'Saque', valor: 'SQ' },
        { rotulo: 'Valor inicial', valor: 'VI' },
        { rotulo: 'Transferência crédito', valor: 'TC' },
        { rotulo: 'Transferência débito', valor: 'TD' }
    ]

    const [pontosRodada, setPontosRodada] = useState(0)
    const [rodada, setRodada] = useState(0)
    const [jogando, setJogando] = useState(false)
    const [cartasIsDisable, setCartasIsDisable] = useState(false)
    const [convidadosIsDisable, setConvidadosIsDisable] = useState(false)
    const [pular1IsDisable, setPular1IsDisable] = useState(false)
    const [pular2IsDisable, setPular2IsDisable] = useState(false)
    const [pular3IsDisable, setPular3IsDisable] = useState(false)

    const [seleçãoNome, setSeleçãoNome] = useState('')
    const [listaClientes, setListaClientes] = useState([])
    const [historico, setHistorico] = useState([])

    const [listaPerguntas, setListaPerguntas] = useState([])
    const [listaPerguntasFaceis, setListaPerguntasFaceis] = useState([])
    const [listaPerguntasDificeis, setListaPerguntasDificeis] = useState([])
    const [listaPerguntasIntermediarias, setListaPerguntasIntermediarias] = useState([])
    const [perguntaAtual, setPerguntaAtual] = useState({})

    useEffect(() => {

        const perguntas = JSON.parse(localStorage.getItem('listaPerguntas'))
        if (perguntas) {
            setListaPerguntas(perguntas)
        }
        const clientes = JSON.parse(localStorage.getItem('listaClientes'))
        if (clientes) {
            setListaClientes(clientes)
        }
        const historico = JSON.parse(localStorage.getItem('historico'))
        if (historico) {
            setHistorico(historico)
        }

    }, [])

    function embaralharLista(lista) {
        lista.sort(() => Math.random() - 0.5)
        return lista
    }

    function começarJogo() {
        if (seleçãoNome == '') {
            alert('Escolha um usuário')
            return
        }
        setRodada(rodada + 1)
        setJogando(true)

        const faceis = listaPerguntas.filter(l => l.dificuldade == 'Fácil')
        const intermediarias = listaPerguntas.filter(l => l.dificuldade == 'Intermédiario')
        const dificeis = listaPerguntas.filter(l => l.dificuldade == 'Difícil')

        embaralharLista(faceis)
        embaralharLista(intermediarias)
        embaralharLista(dificeis)

        setListaPerguntasFaceis(faceis)
        setListaPerguntasIntermediarias(intermediarias)
        setListaPerguntasDificeis(dificeis)


        if (faceis.length < QUANT_PERGUNTAS_FACEIS) {
            alert('registre mais perguntas faceis')
            return
        }

        if (intermediarias.length < QUANT_PERGUNTAS_INTERMEDIARIAS) {
            alert('registre mais perguntas intermediarias')
            return
        }

        if (dificeis.length < QUANT_PERGUNTAS_DIFICEIS) {
            alert('registre mais perguntas dificeis')
            return
        }

        setPerguntaAtual(faceis[0])

        alert('Jogando')
    }

    function clicarAlternativa1() {
        if (perguntaAtual.alternativas[0] == perguntaAtual.resposta) {
            acertou()
            return
        }
        errou()

    }

    function clicarAlternativa2() {
        if (perguntaAtual.alternativas[1] == perguntaAtual.resposta) {
            acertou()
            return
        }
        errou()
    }

    function clicarAlternativa3() {
        if (perguntaAtual.alternativas[2] == perguntaAtual.resposta) {
            acertou()
            return
        }
        errou()
    }

    function clicarAlternativa4() {
        if (perguntaAtual.alternativas[3] == perguntaAtual.resposta) {
            acertou()
            return
        }
        errou()
    }

    function ajudaCartas() {
        setCartasIsDisable(true)
        alert('ajuda cartas')
    }

    function ajudaConvidados() {
        setConvidadosIsDisable(true)
        alert('ajuda convidados')
    }

    function pularPergunta(botaoPular) {
        if (botaoPular === 1) {
            setPular1IsDisable(true)
        }
        if (botaoPular === 2) {
            setPular2IsDisable(true)
        }
        if (botaoPular === 3) {
            setPular3IsDisable(true)
        }

        let lista = []

        if (rodada <= RODADA_FACIL) {
            lista = [...listaPerguntasFaceis]
            lista.shift()
            setListaPerguntasFaceis(lista)
            setPerguntaAtual(lista[0])
        } else if (rodada > RODADA_FACIL && rodada <= RODADA_INTERMEDIARIA) {
            lista = [...listaPerguntasIntermediarias]
            lista.shift()
            setListaPerguntasIntermediarias(lista)
            setPerguntaAtual(listaPerguntasIntermediarias[0])
        } else if (rodada > RODADA_INTERMEDIARIA && rodada <= RODADA_DIFICIL) {
            lista = [...listaPerguntasDificeis]
            lista.shift()
            setListaPerguntasDificeis(lista)
            setPerguntaAtual(listaPerguntasDificeis[0])
        }

    }

    function acertou() {

        setRodada(rodada + 1)
        setPontosRodada(PONTOS[rodada - 1].acertar)


        let lista = []

        if (rodada < RODADA_FACIL) {
            lista = [...listaPerguntasFaceis]
            lista.shift()
            setListaPerguntasFaceis(lista)
            setPerguntaAtual(lista[0])
            alert(`Você ganhou ${PONTOS[rodada - 1].acertar} pontos`)
        } else if (rodada >= RODADA_FACIL && rodada < RODADA_INTERMEDIARIA) {
            lista = [...listaPerguntasIntermediarias]
            lista.shift()
            setListaPerguntasIntermediarias(lista)
            setPerguntaAtual(listaPerguntasIntermediarias[0])
            alert(`Você ganhou ${PONTOS[rodada - 1].acertar} pontos`)
        } else if (rodada >= RODADA_INTERMEDIARIA && rodada < RODADA_DIFICIL) {
            lista = [...listaPerguntasDificeis]
            lista.shift()
            setListaPerguntasDificeis(lista)
            setPerguntaAtual(listaPerguntasDificeis[0])
            alert(`Você ganhou ${PONTOS[rodada - 1].acertar} pontos`)
        } if (rodada >= RODADA_DIFICIL) {
            alert('VOCÊ GANHOU O JOGO DO MILHÃO')
            encerrarJogo('ganhou')
        }

    }

    function errou() {
        alert(`Você errou e saiu com ${PONTOS[rodada - 1].errar} pontos`)
        encerrarJogo('perdeu')
    }

    function parar() {
        alert(`Você parou com ${PONTOS[rodada - 1].parar} pontos`)
        encerrarJogo('parou')
    }

    function encerrarJogo(statusJogo) {
        if (statusJogo == 'ganhou') {
            const hist = historico

            hist.push({
                cliente: seleçãoNome,
                data: new Date().toLocaleString(),
                tipo: tiposOperação[0].valor,
                valor: PONTOS[rodada - 1].acertar
            })

            setHistorico(hist)
            localStorage.setItem('historico', JSON.stringify(historico))

        } else if (statusJogo == 'perdeu') {
            const hist = historico

            hist.push({
                cliente: seleçãoNome,
                data: new Date().toLocaleString(),
                tipo: tiposOperação[0].valor,
                valor: PONTOS[rodada - 1].errar
            })

            setHistorico(hist)
            localStorage.setItem('historico', JSON.stringify(historico))

        } else if (statusJogo == 'parou') {
            const hist = historico

            hist.push({
                cliente: seleçãoNome,
                data: new Date().toLocaleString(),
                tipo: tiposOperação[0].valor,
                valor: PONTOS[rodada - 1].parar
            })

            setHistorico(hist)
            localStorage.setItem('historico', JSON.stringify(historico))

        }
        setJogando(false)
        setRodada(0)
        setCartasIsDisable(false)
        setConvidadosIsDisable(false)
        setPular1IsDisable(false)
        setPular2IsDisable(false)
        setPular3IsDisable(false)
        setSeleçãoNome('')
    }

    //console.log(listaPerguntasFaceis)
    //console.log(listaPerguntasIntermediarias)
    //console.log(listaPerguntasDificeis)

    return (
        <div>
            <Menu></Menu>

            <div className='container'>

                <Header
                    titulo='Show do milhão'
                    icone='fa-solid fa-circle-dollar-to-slot' />

                {!jogando && <div className='d-flex align-items-center justify-content-center'>

                    <div className='col-lg-6 bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                        <Select
                            Nome="Selecionar cliente"
                            Id="selecionar-cliente"
                            value={seleçãoNome}
                            primeiroValor='Escolha o usuário'
                            opções={listaClientes}
                            onChange={e => setSeleçãoNome(e.target.value)} />

                        <div className='d-flex flex-column pt-3'>
                            <Button
                                tipoBotao="btn btn-success"
                                onClick={começarJogo}>
                                Jogar
                            </Button>
                        </div>

                    </div>

                </div>}

                {jogando && <div className='container bg-primary my-4'>

                    <div className='row'>

                        <div className='col-lg-8 bg-danger text-white border-end border-top border-bottom border-white border-5 rounded-end my-2'>
                            <h1>{rodada + ") "}{perguntaAtual.pergunta}</h1>
                        </div>

                        <div className='col-lg-4'>

                            <dir className='row me-4'>
                                <div className='d-flex flex-column mt-3'>
                                    <Button
                                        tipoBotao="btn btn-lg btn-info border border-white border-3 rounded text-white"
                                        onClick={parar}>
                                        <strong>Parar</strong>
                                    </Button>
                                </div>
                            </dir>

                            <dir className='row text-white'>
                                <h1><strong>Ajuda</strong></h1>
                            </dir>

                        </div>

                    </div>

                    <div className='row'>

                        <div className='col-lg-7'>

                            <div className='row'>
                                <div className='d-flex flex-column mb-3'>
                                    <Button
                                        tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                        onClick={clicarAlternativa1}>
                                        {perguntaAtual.alternativas[0]}
                                    </Button>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='d-flex flex-column mb-3'>
                                    <Button
                                        tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                        onClick={clicarAlternativa2}>
                                        {perguntaAtual.alternativas[1]}
                                    </Button>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='d-flex flex-column mb-3'>
                                    <Button
                                        tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                        onClick={clicarAlternativa3}>
                                        {perguntaAtual.alternativas[2]}
                                    </Button>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='d-flex flex-column mb-3'>
                                    <Button
                                        tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                        onClick={clicarAlternativa4}>
                                        {perguntaAtual.alternativas[3]}
                                    </Button>
                                </div>
                            </div>

                        </div>

                        <div className='col-lg-5'>


                            <div className='container bg-info text-white rounded border border-3 border-white '>
                                <div className='row'>

                                    <div className='col-lg-6'>
                                        <div className='d-flex flex-column text-white'>
                                            <Button
                                                disabled={cartasIsDisable}
                                                tipoBotao="btn btn-lg btn-info text-white"
                                                onClick={ajudaCartas}>
                                                <img style={{ width: 80, marginInline: '50px' }} src="../../public/cards.png" alt="cartas" />Cartas
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='col-lg-6'>
                                        <div className='d-flex flex-column text-white'>
                                            <Button
                                                disabled={convidadosIsDisable}
                                                tipoBotao="btn btn-lg btn-info text-white"
                                                onClick={ajudaConvidados}>
                                                <i className="text-dark fa-4x fa-solid fa-people-line"></i>Convidados
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                                <div className='row'>

                                    <div className='col-lg-4'>
                                        <div className='d-flex flex-column text-white'>
                                            <Button
                                                disabled={pular1IsDisable}
                                                tipoBotao="btn btn-lg btn-info text-white"
                                                onClick={() => pularPergunta(1)}>
                                                <i className="text-primary fa-3x fa-solid fa-right-long"></i>Pular
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='col-lg-4'>
                                        <div className='d-flex flex-column'>
                                            <Button
                                                disabled={pular2IsDisable}
                                                tipoBotao="btn btn-lg btn-info text-white"
                                                onClick={() => pularPergunta(2)}>
                                                <i className="text-warning fa-3x fa-solid fa-right-long"></i>Pular
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='col-lg-4'>
                                        <div className='d-flex flex-column text-white'>
                                            <Button
                                                disabled={pular3IsDisable}
                                                tipoBotao="btn btn-lg btn-info text-white"
                                                onClick={() => pularPergunta(3)}>
                                                <i className="text-danger fa-3x fa-solid fa-right-long"></i>Pular
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            <div className='row my-2 text-center text-white'>

                                <div className='col-lg-4'>
                                    <div className='d-flew bg-warning bg-gradient align-items-center justify-content-center border border-2 border-white rounded'>
                                        <h3>{PONTOS[rodada - 1].errar}</h3>
                                        <h3>errar</h3>
                                    </div>
                                </div>

                                <div className='col-lg-4'>
                                    <div className='d-flew bg-warning bg-gradient align-items-center justify-content-center border border-2 border-white rounded'>
                                        <h3>{PONTOS[rodada - 1].parar}</h3>
                                        <h3>parar</h3>
                                    </div>
                                </div>

                                <div className='col-lg-4'>
                                    <div className='d-flew bg-warning bg-gradient align-items-center justify-content-center border border-2 border-white rounded'>
                                        <h3>{PONTOS[rodada - 1].acertar}</h3>
                                        <h3>acertar</h3>
                                    </div>
                                </div>

                            </div>


                        </div>

                    </div>

                </div>}


            </div>

        </div>
    )
}
