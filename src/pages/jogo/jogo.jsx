import React from 'react'
import { useState, useEffect } from 'react'
import Menu from '../../layout/menuNav';
import Select from '../../components/select';
import Button from '../../components/button';
import Header from '../../components/header';
import Table from '../../components/table';
import { calcularSaldo, realizarOperação } from '../../service/banco'
import { 
    aceitarPerguntaAleatoria,
    cancelar, 
    cartas, 
    clicarAlternativa, 
    começarJogo, 
    comprarAjudaCartas, 
    comprarAjudaConvidados, 
    convidados, 
    inicializandoPerguntasJogo, 
    organizarRanking, 
    parar, 
    passarPerguntas, 
    pularPergunta, 
    pularPerguntaAleatoria, 
    verificarInputs 
} from '../../service/jogo';


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
    const [perguntaAleatoria, setPerguntaAleatoria] = useState({})
    const [numeroRodadaAleatoria, setNumeroRodadaAleatoria] = useState(0)
    const [pontuaçãoPerguntaAleatoria, setPontuaçãoPerguntaAleatoria] = useState(0)
    const [isPerguntaAleatoria, setIsPerguntaAleatoria] = useState(false)

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
        if (rodada === numeroRodadaAleatoria && rodada != 0) {
            setIsPerguntaAleatoria(true)
            console.log(isPerguntaAleatoria)
            let index = 0
            if (rodada > 0 && rodada <= RODADA_FACIL) {
                index = Math.floor(Math.random() * (listaPerguntasJogo.filter(l => l.dificuldade === 'FÁCIL').length - 1) + 1)
            } else if (rodada > RODADA_FACIL && rodada <= RODADA_INTERMEDIARIA) {
                index = Math.floor(Math.random() * (listaPerguntasJogo.filter(l => l.dificuldade === 'INTERMEDIÁRIO').length - 1) + 1)
            } else if (rodada > RODADA_INTERMEDIARIA && rodada <= RODADA_DIFICIL) {
                index = Math.floor(Math.random() * (listaPerguntasJogo.filter(l => l.dificuldade === 'DIFÍCIL').length - 1) + 1)
            }
            setPerguntaAleatoria(listaPerguntasJogo[index])
            const lista = listaPerguntasJogo.filter(p => p != perguntaAleatoria)
            setlistaPerguntasJogo(lista)
        }
        setTimeout(passarPergunta, 0)

    }, [rodada, pulos])

    useEffect(() => {
        if (rodada === numeroRodadaAleatoria) {
            console.log('Pergunta aleatoria', perguntaAleatoria)
            setPerguntaAtual(perguntaAleatoria)
            return
        }
        if (listaPerguntasJogo[0]) {
            setPerguntaAtual(listaPerguntasJogo[0])
            listaPerguntasJogo[0].foiPerguntada = true
        }
    }, [listaPerguntasJogo])

    useEffect(() => {
        cancelar(setConfirmandoJogo)
    }, [modoJogo, seleçãoNome])

    const verPerguntas = () => {
        try {
            verificarInputs(seleçãoNome, modoJogo)

            setConfirmandoJogo(true)

            const number = Math.floor((Math.random() * (RODADA_DIFICIL - 1)) + 1)
            setNumeroRodadaAleatoria(number)

            inicializandoPerguntasJogo
                (listaPerguntas, modoJogo, setlistaPerguntasJogo, QUANT_PERGUNTAS_FACEIS, QUANT_PERGUNTAS_INTERMEDIARIAS, QUANT_PERGUNTAS_DIFICEIS)
        } catch (error) {
            alert(error.message)
        }
    }

    const ajudaCartas = () => {
        alert(cartas(modoJogo, perguntaAtual, alternativasIsDisable, setAlternativasIsDisable, setCartasIsDisable))
    }

    const ajudaConvidados = () => {
        alert(convidados(modoJogo, setConvidadosIsDisable))
    }
    // const acertou = () => {
    //     alert(acertouPergunta(rodada, numeroRodadaAleatoria, setPontuaçãoPerguntaAleatoria, PONTOS, setRodada, RODADA_DIFICIL, pontuaçãoPerguntaAleatoria))
    // }

    // function errou() {
    //     alert(errouPergunta(modoJogo, setRodada, rodada))
    // }
    

    const comprarAjudaCarta = () => {
        try {
            comprarAjudaCartas(cartasIsDisable, setCartasIsDisable, calcularSaldo, historico, seleçãoNome, tiposOperação)
        } catch (error) {
            alert(error.message)
        }
    }

    const comprarAjudaConvidado = () => {
        try {
            comprarAjudaConvidados(convidadosIsDisable, setConvidadosIsDisable, calcularSaldo, historico, seleçãoNome, tiposOperação)
        } catch (error) {
            alert(error.message)
        }
    }

    const passarPergunta = () => {
        passarPerguntas(setAlternativasIsDisable, rodada, listaPerguntasJogo, RODADA_FACIL, RODADA_INTERMEDIARIA, RODADA_DIFICIL, setlistaPerguntasJogo, pulos)
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

                        {pontuaçãoParticipantes.length > 0 && <div className='row'>
                            <div className='col-lg-6'>
                                <div className="table-responsive" style={{ maxHeight: '164px', overflowY: 'auto' }}>
                                    <Table>
                                        <thead>
                                            <tr><th>Ranking</th></tr>
                                        </thead>
                                        <tbody>
                                            {organizarRanking(pontuaçãoParticipantes).map(p => {
                                                return (
                                                    <tr key={p.nome}><td>{p.nome}: {p.pontos}</td></tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                <div className="table-responsive" style={{ maxHeight: '164px', overflowY: 'auto' }}>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Historico de pontuações</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {pontuaçãoParticipantes.map((p, index) => {
                                                return (
                                                    <tr key={index}><td>{p.nome}: {p.pontos}</td></tr>
                                                )
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            </div>
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
                                onClick={() => começarJogo(setConfirmandoJogo, setRodada, rodada, setJogando, setPerguntaAtual, listaPerguntasJogo)}>
                                Começar
                            </Button>
                        </div>

                            <div className='d-flex flex-column mt-2'>
                                <Button
                                    tipoBotao="btn btn-outline-danger"
                                    onClick={() => cancelar(setConfirmandoJogo)}>
                                    Cancelar
                                </Button>
                            </div></>}

                    </div>

                    {confirmandoJogo && <div style={{ maxWidth: '538px', maxHeight: '544px', overflowY: 'auto' }} className='bg-white rounded-4 shadow-sm shadow w-220px p-3 table-responsive'>
                        <h2>Rodada da pergunta aleátoria: {numeroRodadaAleatoria}</h2>

                        <Table>
                            <thead>
                                <tr><th>Perguntas Nível Fácil</th></tr>
                            </thead>
                            <tbody>
                                {listaPerguntasJogo.filter((l, index) => l.dificuldade == 'FÁCIL').map((l, index) => {
                                    return (
                                        <tr key={index}><td>{index + 1} - {l.pergunta} - {l.categoria}</td></tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Table>
                            <thead>
                                <tr><th>Perguntas Nível Intermediario</th></tr>
                            </thead>
                            <tbody>
                                {listaPerguntasJogo.filter((l, index) => l.dificuldade == 'INTERMEDIÁRIO').map((l, index) => {
                                    return (
                                        <tr key={index}><td>{index + 1} - {l.pergunta} - {l.categoria}</td></tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                        <Table>
                            <thead>
                                <tr><th>Perguntas Nível Dificil</th></tr>
                            </thead>
                            <tbody>
                                {listaPerguntasJogo.filter((l, index) => l.dificuldade == 'DIFÍCIL').map((l, index) => {
                                    return (
                                        <tr key={index}><td>{index + 1} - {l.pergunta} - {l.categoria}</td></tr>
                                    )
                                })}
                            </tbody>
                        </Table>

                    </div>}

                </div>}

                {jogando && <div className='row'>

                    <div className='col-lg-12'>

                        {isPerguntaAleatoria && <div className='container bg-primary my-4 rounded shadow'>
                            <div className='row text-center'>
                                <h1>Você deseja responder uma pergunta aleatoria e ganhar o dobro da pontuação desta rodada?</h1>
                            </div>
                            <div className='row text-center'>
                                <div className='col-lg-6'>
                                    <div className='d-flex flex-column mt-3'>
                                        <Button
                                            tipoBotao="btn btn-lg btn-info border border-white border-3 rounded text-white"
                                            onClick={() => aceitarPerguntaAleatoria(setIsPerguntaAleatoria)}>
                                            <strong>Sim</strong>
                                        </Button>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='d-flex flex-column mt-3'>
                                        <Button
                                            tipoBotao="btn btn-lg btn-info border border-white border-3 rounded text-white"
                                            onClick={() => pularPerguntaAleatoria(setNumeroRodadaAleatoria, setIsPerguntaAleatoria, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos)}>
                                            <strong>Não</strong>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        {!isPerguntaAleatoria && <div className='container bg-primary my-4 rounded shadow'>

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
                                                onClick={() =>
                                                    parar(modoJogo,
                                                        PONTOS,
                                                        pontuaçãoPerguntaAleatoria,
                                                        pontuaçãoParticipantes,
                                                        setPontuaçãoParticipantes,
                                                        historico,
                                                        seleçãoNome,
                                                        tiposOperação,
                                                        setAlternativasIsDisable,
                                                        setJogando,
                                                        setRodada,
                                                        setPulos,
                                                        setlistaPerguntasJogo,
                                                        setCartasIsDisable,
                                                        setConvidadosIsDisable,
                                                        setPularIsDisable,
                                                        setSeleçãoNome,
                                                        rodada,
                                                        setHistorico)}>
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
                                                onClick={() => clicarAlternativa(0,
                                                    modoJogo,
                                                    PONTOS,
                                                    pontuaçãoPerguntaAleatoria,
                                                    pontuaçãoParticipantes,
                                                    setPontuaçãoParticipantes,
                                                    historico,
                                                    seleçãoNome,
                                                    tiposOperação,
                                                    setAlternativasIsDisable,
                                                    setJogando,
                                                    setRodada,
                                                    setPulos,
                                                    setlistaPerguntasJogo,
                                                    setCartasIsDisable,
                                                    setConvidadosIsDisable,
                                                    setPularIsDisable,
                                                    setSeleçãoNome,
                                                    rodada,
                                                    numeroRodadaAleatoria,
                                                    setPontuaçãoPerguntaAleatoria,
                                                    perguntaAtual,
                                                    RODADA_DIFICIL,
                                                    setHistorico)}>
                                                {perguntaAtual.alternativas[0]}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='d-flex flex-column mb-2'>
                                            <Button
                                                disabled={alternativasIsDisable[1]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(1,
                                                    modoJogo,
                                                    PONTOS,
                                                    pontuaçãoPerguntaAleatoria,
                                                    pontuaçãoParticipantes,
                                                    setPontuaçãoParticipantes,
                                                    historico,
                                                    seleçãoNome,
                                                    tiposOperação,
                                                    setAlternativasIsDisable,
                                                    setJogando,
                                                    setRodada,
                                                    setPulos,
                                                    setlistaPerguntasJogo,
                                                    setCartasIsDisable,
                                                    setConvidadosIsDisable,
                                                    setPularIsDisable,
                                                    setSeleçãoNome,
                                                    rodada,
                                                    numeroRodadaAleatoria,
                                                    setPontuaçãoPerguntaAleatoria,
                                                    perguntaAtual,
                                                    RODADA_DIFICIL,
                                                    setHistorico)}>
                                                {perguntaAtual.alternativas[1]}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='d-flex flex-column mb-2'>
                                            <Button
                                                disabled={alternativasIsDisable[2]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(2,
                                                    modoJogo,
                                                    PONTOS,
                                                    pontuaçãoPerguntaAleatoria,
                                                    pontuaçãoParticipantes,
                                                    setPontuaçãoParticipantes,
                                                    historico,
                                                    seleçãoNome,
                                                    tiposOperação,
                                                    setAlternativasIsDisable,
                                                    setJogando,
                                                    setRodada,
                                                    setPulos,
                                                    setlistaPerguntasJogo,
                                                    setCartasIsDisable,
                                                    setConvidadosIsDisable,
                                                    setPularIsDisable,
                                                    setSeleçãoNome,
                                                    rodada,
                                                    numeroRodadaAleatoria,
                                                    setPontuaçãoPerguntaAleatoria,
                                                    perguntaAtual,
                                                    RODADA_DIFICIL,
                                                    setHistorico)}>
                                                {perguntaAtual.alternativas[2]}
                                            </Button>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='d-flex flex-column mb-3'>
                                            <Button
                                                disabled={alternativasIsDisable[3]}
                                                tipoBotao="btn btn-lg btn-danger border-white border-5 rounded"
                                                onClick={() => clicarAlternativa(3,
                                                    modoJogo,
                                                    PONTOS,
                                                    pontuaçãoPerguntaAleatoria,
                                                    pontuaçãoParticipantes,
                                                    setPontuaçãoParticipantes,
                                                    historico,
                                                    seleçãoNome,
                                                    tiposOperação,
                                                    setAlternativasIsDisable,
                                                    setJogando,
                                                    setRodada,
                                                    setPulos,
                                                    setlistaPerguntasJogo,
                                                    setCartasIsDisable,
                                                    setConvidadosIsDisable,
                                                    setPularIsDisable,
                                                    setSeleçãoNome,
                                                    rodada,
                                                    numeroRodadaAleatoria,
                                                    setPontuaçãoPerguntaAleatoria,
                                                    perguntaAtual,
                                                    RODADA_DIFICIL,
                                                    setHistorico)}>
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
                                                        onClick={() => pularPergunta(1, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos)}>
                                                        <i className="text-primary fa-3x fa-solid fa-right-long"></i>Pular
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='col-lg-4'>
                                                <div className='d-flex flex-column'>
                                                    <Button
                                                        disabled={pularIsDisable[1]}
                                                        tipoBotao="btn btn-lg btn-info text-white"
                                                        onClick={() => pularPergunta(2, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos)}>
                                                        <i className="text-warning fa-3x fa-solid fa-right-long"></i>Pular
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className='col-lg-4'>
                                                <div className='d-flex flex-column text-white'>
                                                    <Button
                                                        disabled={pularIsDisable[2]}
                                                        tipoBotao="btn btn-lg btn-info text-white"
                                                        onClick={() => pularPergunta(3, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos)}>
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
                                                    <><h3>{rodada === numeroRodadaAleatoria ? (PONTOS[rodada - 1].acertar*2) : PONTOS[rodada - 1].acertar}</h3><h3>acertar</h3></> : <h5>Modo treinamento</h5>}
                                            </div>
                                        </div>

                                    </div>


                                </div>

                            </div>

                        </div>}

                    </div>

                    {(!isPerguntaAleatoria && modoJogo != 'Modo treinamento') && <div className='col-lg-3'>

                        <div className='container bg-primary my-4 rounded shadow text-center text-white'>
                            <h2>Comprar Ajuda</h2>
                            <h3>Saldo no banco: {calcularSaldo(historico.filter(h => h.cliente == seleçãoNome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h3>

                            <div className='row'>

                                <div className='d-flex flex-column'>

                                    <div className='d-flex flex-column text-white mt-3 mb-2'>
                                        <Button
                                            tipoBotao="btn btn-lg btn-success text-white"
                                            onClick={comprarAjudaCarta}>
                                            <h1>1000<i className="fa-solid fa-dollar-sign"></i></h1>Restaurar Cartas
                                        </Button>
                                    </div>

                                    <div className='d-flex flex-column text-white my-2'>
                                        <Button
                                            tipoBotao="btn btn-lg btn-success text-white"
                                            onClick={comprarAjudaConvidado}>
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