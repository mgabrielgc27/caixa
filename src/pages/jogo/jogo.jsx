import React from 'react'
import { useState, useEffect } from 'react'
import Menu from '../../layout/menuNav';
import Select from '../../components/select';
import Button from '../../components/button';
import Header from '../../components/header';
import Table from '../../components/table';
import { calcularSaldo } from '../../service/banco'


export default function jogo() {

    const QUANT_PERGUNTAS_FACEIS = 13
    const QUANT_PERGUNTAS_INTERMEDIARIAS = 7
    const QUANT_PERGUNTAS_DIFICEIS = 5
    const RODADA_FACIL = 10
    const RODADA_INTERMEDIARIA = 14
    const RODADA_DIFICIL = 16

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
        { rotulo: 'Transferência débito', valor: 'TD' },
        { rotulo: 'Compra', valor: 'CP' }
    ]

    const modosJogo = [
        "Modo normal", "Modo treinamento", "Categoria matemática", "Categoria português", "Categoria conhecimentos gerais"
    ]

    const [pontuaçãoParticipantes, setPontuaçãoParticipantes] = useState([])
    const [rodada, setRodada] = useState(0)
    const [pulos, setPulos] = useState(0)
    const [modoJogo, setModoJogo] = useState('')
    const [jogando, setJogando] = useState(false)
    const [confirmandoJogo, setConfirmandoJogo] = useState(false)
    const [alternativasIsDisable, setAlternativasIsDisable] = useState([false, false, false, false])
    const [cartasIsDisable, setCartasIsDisable] = useState(false)
    const [convidadosIsDisable, setConvidadosIsDisable] = useState(false)
    const [pularIsDisable, setPularIsDisable] = useState([false, false, false])

    const [seleçãoNome, setSeleçãoNome] = useState('')
    const [listaClientes, setListaClientes] = useState([])
    const [historico, setHistorico] = useState([])

    const [listaPerguntas, setListaPerguntas] = useState([])
    const [listaPerguntasJogo, setlistaPerguntasJogo] = useState([])
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
        const pontos = JSON.parse(localStorage.getItem('pontuaçãoParticipantes'))
        if (pontos) {
            setPontuaçãoParticipantes(pontos)
        }

    }, [])

    useEffect(() => {
        console.log(listaPerguntasJogo)
        setTimeout(passarPergunta, 0)

    }, [rodada, pulos])

    useEffect(() => {
        if (listaPerguntasJogo[0]) {
            setPerguntaAtual(listaPerguntasJogo[0])
            listaPerguntasJogo[0].foiPerguntada = true
            console.log(listaPerguntasJogo[0].foiPerguntada)
        }
    }, [listaPerguntasJogo])

    useEffect(() => {
        cancelar()
    }, [modoJogo, seleçãoNome])


    const embaralharLista = (lista) => {
        lista.sort(() => Math.random() - 0.5)
        return lista
    }

    const verPerguntas = () => {
        if (seleçãoNome == '') {
            alert('Escolha um usuário')
            return
        }

        if (modoJogo == '') {
            alert('Escolha um modo')
            return
        }

        let faceis = listaPerguntas.filter(l => l.dificuldade == 'FÁCIL')
        let intermediarias = listaPerguntas.filter(l => l.dificuldade == 'INTERMEDIÁRIO')
        let dificeis = listaPerguntas.filter(l => l.dificuldade == 'DIFÍCIL')

        if (modoJogo == 'Categoria matemática') {
            faceis = faceis.filter(l => l.categoria === "MATEMÁTICA")
            intermediarias = intermediarias.filter(l => l.categoria === "MATEMÁTICA")
            dificeis = dificeis.filter(l => l.categoria === "MATEMÁTICA")
        } else if (modoJogo == 'Categoria português') {
            faceis = faceis.filter(l => l.categoria === "PORTUGUÊS")
            intermediarias = intermediarias.filter(l => l.categoria === "PORTUGUÊS")
            dificeis = dificeis.filter(l => l.categoria === "PORTUGUÊS")
        } else if (modoJogo == 'Categoria conhecimentos gerais') {
            faceis = faceis.filter(l => l.categoria === "CONHECIMENTOS GERAIS")
            intermediarias = intermediarias.filter(l => l.categoria === "CONHECIMENTOS GERAIS")
            dificeis = dificeis.filter(l => l.categoria === "CONHECIMENTOS GERAIS")
        }

        embaralharLista(faceis)
        embaralharLista(intermediarias)
        embaralharLista(dificeis)

        setlistaPerguntasJogo([...faceis, ...intermediarias, ...dificeis])

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

        setConfirmandoJogo(true)
    }

    const cancelar = () => {
        setConfirmandoJogo(false)
    }

    const começarJogo = () => {

        setConfirmandoJogo(false)
        setRodada(rodada + 1)
        setJogando(true)

        setPerguntaAtual(listaPerguntasJogo[0])
        alert('Jogando')
    }

    function clicarAlternativa(alternativa) {
        if (perguntaAtual.alternativas[alternativa] == perguntaAtual.resposta) {
            acertou()
            return
        }
        errou()

    }

    function ajudaCartas() {
        if (modoJogo != 'Modo treinamento')
            setCartasIsDisable(true);

        const numberRandom1 = Math.floor((Math.random() * 4) + 1)

        const indexResposta = perguntaAtual.alternativas.findIndex(a => a === perguntaAtual.resposta)
        const alternativasIsDisableTemp = alternativasIsDisable.filter((a, index) => index != indexResposta)

        if (numberRandom1 === 1) {
            alert('Você conseguiu um Rei, nenhuma alternativa será eliminada')
            return

        } else if (numberRandom1 === 2) {
            alert('Você conseguiu um Ás, uma alternativa será eliminada')

            const numberRandom2 = Math.floor((Math.random() * 3))
            console.log(numberRandom2)

            alternativasIsDisableTemp[numberRandom2] = true

        } else if (numberRandom1 === 3) {
            alert('Você conseguiu um 2, duas alternativas serão eliminadas')

            const numberRandom3 = Math.floor((Math.random() * 3))

            for (let index = 0; index < alternativasIsDisableTemp.length; index++) {
                if (index !== numberRandom3) {
                    alternativasIsDisableTemp[index] = true
                }

            }

        } else if (numberRandom1 === 4) {
            alert('Você conseguiu um 3, três alternativas serão eliminadas')

            alternativasIsDisableTemp[0] = true
            alternativasIsDisableTemp[1] = true
            alternativasIsDisableTemp[2] = true
        }

        alternativasIsDisableTemp.splice(indexResposta, 0, false)
        setAlternativasIsDisable(alternativasIsDisableTemp)
    }

    function ajudaConvidados() {
        if (modoJogo != 'Modo treinamento')
            setConvidadosIsDisable(true);

        let percentage1 = Math.floor((Math.random() * 99) + 1);
        let percentage2 = Math.floor((Math.random() * 99) + 1);
        let percentage3 = Math.floor((Math.random() * 99) + 1);

        let total = (percentage1 + percentage2 + percentage3 + 5);

        percentage1 = (percentage1 / total) * 100;
        percentage2 = (percentage2 / total) * 100;
        percentage3 = (percentage3 / total) * 100;

        let percentage4 = 100 - (percentage1 + percentage2 + percentage3);

        alert(`Alternativa 1: ${percentage1.toFixed(2)}% - Alternativa 2: ${percentage2.toFixed(2)}%\nAlternativa 3: ${percentage3.toFixed(2)}% - Alternativa 4: ${percentage4.toFixed(2)}%`)
    }

    function pularPergunta(botaoPular) {
        if (botaoPular === 1) {
            if (modoJogo != 'Modo treinamento') {
                const pular = pularIsDisable
                pular[0] = true
                setPularIsDisable(pular)
            }
        }
        if (botaoPular === 2) {
            if (modoJogo != 'Modo treinamento') {
                const pular = pularIsDisable
                pular[1] = true
                setPularIsDisable(pular)
            }
        }
        if (botaoPular === 3) {
            if (modoJogo != 'Modo treinamento') {
                const pular = pularIsDisable
                pular[2] = true
                setPularIsDisable(pular)
            }
        }

        setPulos(pulos + 1)

    }

    function acertou() {

        setRodada(rodada + 1)

        if (rodada >= RODADA_DIFICIL) {
            alert('VOCÊ GANHOU O JOGO DO MILHÃO')
            encerrarJogo('ganhou')
        }
        if (modoJogo != "Modo treinamento")
            alert(`Você ganhou ${PONTOS[rodada - 1].acertar} pontos`);
        else
            alert('Você acertou')

    }

    function passarPergunta() {
        setAlternativasIsDisable([false, false, false, false])
        if (rodada <= 1) {
            return
        }

        let lista = [...listaPerguntasJogo]
        if (rodada > RODADA_FACIL && rodada <= RODADA_INTERMEDIARIA) {
            lista = lista.filter(l => l.dificuldade != 'FÁCIL')
        } else if (rodada > RODADA_INTERMEDIARIA && rodada <= RODADA_DIFICIL) {
            lista = lista.filter(l => l.dificuldade === 'DIFÍCIL')
        }
        lista = lista.filter(l => l.foiPerguntada == false)
        setlistaPerguntasJogo(lista)
    }

    function errou() {
        if (modoJogo != 'Modo treinamento') {
            alert(`Você errou e saiu com ${PONTOS[rodada - 1].errar} pontos`)
            encerrarJogo('perdeu')
        } else {
            alert('Você errou')
            setRodada(rodada + 1)
        }
    }

    function parar() {
        if (modoJogo != 'Modo treinamento')
            alert(`Você parou com ${PONTOS[rodada - 1].parar} pontos`);

        encerrarJogo('parou')
    }

    function encerrarJogo(statusJogo) {
        if (modoJogo != 'Modo treinamento') {
            if (statusJogo == 'ganhou') {
                guardarPontuaçãoParticipante(PONTOS[rodada - 1].acertar)
                realizarOperação(tiposOperação[0].valor, PONTOS[rodada - 1].acertar)

            } else if (statusJogo == 'perdeu') {
                if (PONTOS[rodada - 1].errar != 0) {
                    guardarPontuaçãoParticipante(PONTOS[rodada - 1].errar)
                    realizarOperação(tiposOperação[0].valor, PONTOS[rodada - 1].errar)
                }

            } else if (statusJogo == 'parou') {
                if (PONTOS[rodada - 1].parar != 0) {
                    guardarPontuaçãoParticipante(PONTOS[rodada - 1].parar)
                    realizarOperação(tiposOperação[0].valor, PONTOS[rodada - 1].parar)
                }
            }
        }
        setAlternativasIsDisable([false, false, false, false])
        setJogando(false)
        setRodada(0)
        setPulos(0)
        setlistaPerguntasJogo([])
        setCartasIsDisable(false)
        setConvidadosIsDisable(false)
        setPularIsDisable([false, false, false])
        setSeleçãoNome('')
    }

    const comprarAjudaCartas = () => {

        if (cartasIsDisable) {
            setCartasIsDisable(false)

            if(1000 > calcularSaldo(historico.filter(h => h.cliente == seleçãoNome))){
                alert('Saldo insuficiente')
                return
            }

            realizarOperação('CP', '1000')
        }

    }

    const comprarAjudaConvidados = () => {

        if (convidadosIsDisable) {
            setConvidadosIsDisable(false)

            if(1000 > calcularSaldo(historico.filter(h => h.cliente == seleçãoNome))){
                alert('Saldo insuficiente')
                return
            }

            realizarOperação('CP', '1000')
        }

    }

    const guardarPontuaçãoParticipante = (pontuação) => {
        const pontosParticipantes = pontuaçãoParticipantes

        pontosParticipantes.push({
            nome: seleçãoNome,
            pontos: pontuação
        })

        console.log(pontosParticipantes)

        setPontuaçãoParticipantes(pontosParticipantes)
        localStorage.setItem('pontuaçãoParticipantes', JSON.stringify(pontuaçãoParticipantes))
    }

    const organizarRanking = (pontuações) => {

        const rankingObj = pontuações.reduce((acc, pontuação) => {
            const { nome, pontos } = pontuação;

            if (!acc[nome] || pontos > acc[nome]) {
                acc[nome] = pontos;
            }

            return acc;

        }, {})

        console.log(Object.entries(rankingObj))
        const rankingList = Object.entries(rankingObj)
            .map(([nome, pontos]) => ({ nome, pontos }))
            .sort((a, b) => b.pontos - a.pontos);

        return rankingList;
    }

    const realizarOperação = (tipo, valor) => {
        const historicoTemp = historico
        historicoTemp.push({
            cliente: seleçãoNome,
            data: new Date().toLocaleDateString(),
            tipo: tipo,
            valor: valor
        })
        setHistorico(historicoTemp)
        localStorage.setItem('historico', JSON.stringify(historico))
    }

    return (
        <div>
            <Menu></Menu>

            <div className='container'>

                <Header
                    titulo='Show do milhão'
                    icone='fa-solid fa-circle-dollar-to-slot' />

                {!jogando && <div className='d-flex flex-collumn justify-content-center'>


                    <div className='col-lg-6 bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                        {<div>
                            <Table>
                                <thead>
                                    <tr><th>Ranking de pontos</th></tr>
                                </thead>
                                <tbody>
                                    {organizarRanking(pontuaçãoParticipantes).map(p => {
                                        return (
                                            <tr><td>{p.nome}: {p.pontos}</td></tr>
                                        )
                                    })}
                                </tbody>
                            </Table>
                        </div>}

                        <Select
                            Nome="Selecionar cliente"
                            Id="selecionar-cliente"
                            value={seleçãoNome}
                            primeiroValor='Escolha o usuário'
                            opções={listaClientes}
                            onChange={e => setSeleçãoNome(e.target.value)} />

                        {seleçãoNome && <Select
                            Nome="Selecionar modo de jogo"
                            Id="selecionar-modo-jogo"
                            value={modoJogo}
                            primeiroValor='Escolha o modo de jogo'
                            opções={modosJogo}
                            onChange={e => setModoJogo(e.target.value)} />}

                        <div className='d-flex flex-column pt-3'>
                            <Button
                                tipoBotao="btn btn-primary"
                                onClick={verPerguntas}>
                                Ver Perguntas
                            </Button>
                        </div>

                        {confirmandoJogo && <><div className='d-flex flex-column mt-2'>
                            <Button
                                tipoBotao="btn btn-success"
                                onClick={começarJogo}>
                                Começar
                            </Button>
                        </div>

                            <div className='d-flex flex-column mt-2'>
                                <Button
                                    tipoBotao="btn btn-outline-danger"
                                    onClick={cancelar}>
                                    Cancelar
                                </Button>
                            </div></>}

                    </div>

                    {confirmandoJogo && <div className='bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                        <Table>
                            <th>Perguntas Nível Fácil</th>
                            {listaPerguntasJogo.filter(l => l.dificuldade == 'FÁCIL').map((l, index) => {
                                return (
                                    <tr>{index + 1} - {l.pergunta} - {l.categoria}</tr>
                                )
                            })}
                            <th>Perguntas Nível Intermediario</th>
                            {listaPerguntasJogo.filter(l => l.dificuldade == 'INTERMEDIÁRIO').map((l, index) => {
                                return (
                                    <tr>{index + 1} - {l.pergunta} - {l.categoria}</tr>
                                )
                            })}
                            <th>Perguntas Nível Dificil</th>
                            {listaPerguntasJogo.filter(l => l.dificuldade == 'DIFÍCIL').map((l, index) => {
                                return (
                                    <tr>{index + 1} - {l.pergunta} - {l.categoria}</tr>
                                )
                            })}
                        </Table>

                    </div>}

                </div>}

                {jogando && <div className='row'>

                    <div className='col-lg-9'>

                        <div className='container bg-primary my-4 rounded shadow'>

                            <div className='row'>

                                <div className='col-lg-8 bg-danger text-white border-end border-top border-bottom border-white border-5 rounded-end my-2'>
                                    <h6>{perguntaAtual.categoria + " - " + perguntaAtual.dificuldade}</h6>
                                    <h2>{rodada + ") " + perguntaAtual.pergunta}</h2>
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
                                        <div className='d-flex flex-column mb-2'>
                                            <Button
                                                disabled={alternativasIsDisable[0]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(0)}>
                                                {perguntaAtual.alternativas[0]}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='d-flex flex-column mb-2'>
                                            <Button
                                                disabled={alternativasIsDisable[1]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(1)}>
                                                {perguntaAtual.alternativas[1]}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='d-flex flex-column mb-2'>
                                            <Button
                                                disabled={alternativasIsDisable[2]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(2)}>
                                                {perguntaAtual.alternativas[2]}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='d-flex flex-column mb-3'>
                                            <Button
                                                disabled={alternativasIsDisable[3]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(3)}>
                                                {perguntaAtual.alternativas[3]}
                                            </Button>
                                        </div>
                                    </div>

                                </div>

                                <div className='col-lg-5'>


                                    <div className='container bg-info text-white rounded border border-3 border-white '>
                                        <div className='row'>

                                            <div className='col-lg-7 text-center'>
                                                <h6>Cartas</h6>
                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <div className='d-flex flex-column text-white'>
                                                            <Button
                                                                disabled={cartasIsDisable}
                                                                tipoBotao="btn btn-lg btn-info text-white"
                                                                onClick={ajudaCartas}>
                                                                <img style={{ width: 35 }} src="../../cartas.png" alt="" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className='d-flex flex-column text-white'>
                                                            <Button
                                                                disabled={cartasIsDisable}
                                                                tipoBotao="btn btn-lg btn-info text-white"
                                                                onClick={ajudaCartas}>
                                                                <img style={{ width: 35 }} src="../../cartas.png" alt="" />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                </div>

                                                <div className='row'>
                                                    <div className='col-6'>
                                                        <div className='d-flex flex-column text-white'>
                                                            <Button
                                                                disabled={cartasIsDisable}
                                                                tipoBotao="btn btn-lg btn-info text-white"
                                                                onClick={ajudaCartas}>
                                                                <img style={{ width: 35 }} src="../../cartas.png" alt="" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                    <div className='col-6'>
                                                        <div className='d-flex flex-column text-white'>
                                                            <Button
                                                                disabled={cartasIsDisable}
                                                                tipoBotao="btn btn-lg btn-info text-white"
                                                                onClick={ajudaCartas}>
                                                                <img style={{ width: 35 }} src="../../cartas.png" alt="" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className='col-lg-5'>
                                                <div className='d-flex flex-column text-white mt-4'>
                                                    <Button
                                                        disabled={convidadosIsDisable}
                                                        tipoBotao="btn btn-sm btn-info text-white"
                                                        onClick={ajudaConvidados}>
                                                        <i className="text-dark fa-3x fa-solid fa-people-line"></i>Convidados
                                                    </Button>
                                                </div>
                                            </div>

                                        </div>

                                        <div className='row'>

                                            <div className='col-lg-4'>
                                                <div className='d-flex flex-column text-white'>
                                                    <Button
                                                        disabled={pularIsDisable[0]}
                                                        tipoBotao="btn btn-lg btn-info text-white"
                                                        onClick={() => pularPergunta(1)}>
                                                        <i className="text-primary fa-3x fa-solid fa-right-long"></i>Pular
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='col-lg-4'>
                                                <div className='d-flex flex-column'>
                                                    <Button
                                                        disabled={pularIsDisable[1]}
                                                        tipoBotao="btn btn-lg btn-info text-white"
                                                        onClick={() => pularPergunta(2)}>
                                                        <i className="text-warning fa-3x fa-solid fa-right-long"></i>Pular
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='col-lg-4'>
                                                <div className='d-flex flex-column text-white'>
                                                    <Button
                                                        disabled={pularIsDisable[2]}
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
                                                {modoJogo != 'Modo treinamento' ?
                                                    <><h3>{PONTOS[rodada - 1].errar}</h3><h3>errar</h3></> : <h5>Modo treinamento</h5>}
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='d-flew bg-warning bg-gradient align-items-center justify-content-center border border-2 border-white rounded'>
                                                {modoJogo != 'Modo treinamento' ?
                                                    <><h3>{PONTOS[rodada - 1].parar}</h3><h3>parar</h3></> : <h5>Modo treinamento</h5>}
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='d-flew bg-warning bg-gradient align-items-center justify-content-center border border-2 border-white rounded'>
                                                {modoJogo != 'Modo treinamento' ?
                                                    <><h3>{PONTOS[rodada - 1].acertar}</h3><h3>acertar</h3></> : <h5>Modo treinamento</h5>}
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>

                    </div>

                    {modoJogo != 'Modo treinamento' && <div className='col-lg-3'>

                        <div className='container bg-primary my-4 rounded shadow text-center text-white'>
                            <h2>Comprar Ajuda</h2>
                            <h3>Saldo no banco: {calcularSaldo(historico.filter(h => h.cliente == seleçãoNome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>

                            <div className='row'>

                                <div className='d-flex flex-column'>

                                    <div className='d-flex flex-column text-white mt-3 mb-2'>
                                        <Button
                                            tipoBotao="btn btn-lg btn-success text-white"
                                            onClick={comprarAjudaCartas}>
                                            <h1>1000<i className="fa-solid fa-dollar-sign"></i></h1>Restaurar Cartas
                                        </Button>
                                    </div>

                                    <div className='d-flex flex-column text-white my-2'>
                                        <Button
                                            tipoBotao="btn btn-lg btn-success text-white"
                                            onClick={comprarAjudaConvidados}>
                                            <h1>1000<i className="fa-solid fa-dollar-sign"></i></h1>Restaurar Convidados
                                        </Button>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>}

                </div>}

            </div>

        </div>
    )
}
