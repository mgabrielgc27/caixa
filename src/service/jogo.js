import { realizarOperação } from "./banco";

export const verificarInputs = (seleçãoNome, modoJogo) => {
    if (seleçãoNome == '') {
        throw new Error('Escolha um usuário')
    }

    if (modoJogo == '') {
        throw new Error('Escolha um modo');
    }
}

export const embaralharLista = (lista) => {
    for (let i = lista.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [lista[i], lista[j]] = [lista[j], lista[i]];
    }
    return lista
}

export const inicializandoPerguntasJogo =
    (listaPerguntas, modoJogo, setlistaPerguntasJogo, QUANT_PERGUNTAS_FACEIS, QUANT_PERGUNTAS_INTERMEDIARIAS, QUANT_PERGUNTAS_DIFICEIS) => {

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
            throw new Error('registre mais perguntas faceis')
        }

        if (intermediarias.length < QUANT_PERGUNTAS_INTERMEDIARIAS) {
            throw new Error('registre mais perguntas intermediarias')
        }

        if (dificeis.length < QUANT_PERGUNTAS_DIFICEIS) {
            throw new Error('registre mais perguntas dificeis')
        }
    }

export const começarJogo = (setConfirmandoJogo, setRodada, rodada, setJogando, setPerguntaAtual, listaPerguntasJogo) => {
    setConfirmandoJogo(false)
    setRodada(rodada + 1)
    setJogando(true)
    setPerguntaAtual(listaPerguntasJogo[0])
}

export const clicarAlternativa =
    (
        alternativa,
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
        setHistorico
    ) => {
        if (perguntaAtual.alternativas[alternativa] == perguntaAtual.resposta) {
            acertouPergunta(modoJogo,
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
                RODADA_DIFICIL,
                setHistorico)
            return
        }
        errouPergunta(modoJogo,
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
            setHistorico)
    }

const acertouPergunta = (
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
    RODADA_DIFICIL,
    setHistorico
) => {

    let resp = '';

    if (rodada === numeroRodadaAleatoria) {
        setPontuaçãoPerguntaAleatoria(PONTOS[numeroRodadaAleatoria - 1].acertar)
    }

    setRodada(rodada + 1)

    if (rodada >= RODADA_DIFICIL) {
        encerrarJogo(modoJogo,
            'ganhou',
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
            setHistorico
        )
    }
    if (modoJogo != "Modo treinamento")
        resp += (`Você ganhou ${(PONTOS[rodada - 1].acertar + pontuaçãoPerguntaAleatoria)} pontos`);
    else
        resp += 'Você acertou';

    return resp
}

const errouPergunta = (
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
    setHistorico
) => {

    let resp = '';

    if (modoJogo != 'Modo treinamento') {
        encerrarJogo(modoJogo,
            'perdeu',
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
            setHistorico
        )
    } else {
        resp += 'Você errou'
        setRodada(rodada + 1)
    }

    return resp;
}

export const parar = (
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
    setHistorico
) => {

    encerrarJogo(modoJogo,
        'parou',
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
        setHistorico   
    )
}

const encerrarJogo = (
    modoJogo,
    statusJogo,
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
    setHistorico
) => {

    if (modoJogo != 'Modo treinamento') {
        let resp = '';
        if (statusJogo == 'ganhou') {
            const pontos = PONTOS[rodada - 1].acertar + pontuaçãoPerguntaAleatoria;
            resp += `VOCÊ GANHOU O SHOW DO MILHÃO COM ${pontos}`
            guardarPontuaçãoParticipante(pontos, pontuaçãoParticipantes, setPontuaçãoParticipantes, seleçãoNome)
            guardarValorPremio(historico, seleçãoNome, tiposOperação[0].valor, pontos, tiposOperação, setHistorico)

        } else if (statusJogo == 'perdeu') {
            if (PONTOS[rodada - 1].errar != 0) {
                const pontos = PONTOS[rodada - 1].errar + pontuaçãoPerguntaAleatoria
                resp += `Você ganhou ${pontos}`
                guardarPontuaçãoParticipante(pontos, pontuaçãoParticipantes, setPontuaçãoParticipantes, seleçãoNome)
                guardarValorPremio(historico, seleçãoNome, tiposOperação[0].valor, pontos, tiposOperação, setHistorico)
            }

        } else if (statusJogo == 'parou') {
            if (PONTOS[rodada - 1].parar != 0) {
                const pontos = PONTOS[rodada - 1].parar + pontuaçãoPerguntaAleatoria
                resp += `Você ganhou ${pontos}`
                guardarPontuaçãoParticipante(pontos, pontuaçãoParticipantes, setPontuaçãoParticipantes, seleçãoNome)
                guardarValorPremio(historico, seleçãoNome, tiposOperação[0].valor, pontos, tiposOperação, setHistorico)
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

export const cartas = (modoJogo, perguntaAtual, alternativasIsDisable, setAlternativasIsDisable, setCartasIsDisable) => {
    if (modoJogo != 'Modo treinamento')
        setCartasIsDisable(true);

    let resp = '';
    const numberRandom1 = Math.floor((Math.random() * 4) + 1)

    const indexResposta = perguntaAtual.alternativas.findIndex(a => a === perguntaAtual.resposta)
    const alternativasIsDisableTemp = alternativasIsDisable.filter((a, index) => index != indexResposta)

    if (numberRandom1 === 1) {
        resp += 'Você conseguiu um Rei, nenhuma alternativa será eliminada';

    } else if (numberRandom1 === 2) {
        resp += 'Você conseguiu um Ás, uma alternativa será eliminada';

        const numberRandom2 = Math.floor((Math.random() * 3))

        alternativasIsDisableTemp[numberRandom2] = true

    } else if (numberRandom1 === 3) {
        resp += 'Você conseguiu um 2, duas alternativas serão eliminadas';

        const numberRandom3 = Math.floor((Math.random() * 3))

        for (let index = 0; index < alternativasIsDisableTemp.length; index++) {
            if (index !== numberRandom3) {
                alternativasIsDisableTemp[index] = true
            }

        }

    } else if (numberRandom1 === 4) {
        resp += 'Você conseguiu um 3, três alternativas serão eliminadas';

        alternativasIsDisableTemp[0] = true
        alternativasIsDisableTemp[1] = true
        alternativasIsDisableTemp[2] = true
    }

    alternativasIsDisableTemp.splice(indexResposta, 0, false)
    setAlternativasIsDisable(alternativasIsDisableTemp)

    return resp;
}

export const convidados = (modoJogo, setConvidadosIsDisable) => {

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

    return (`Alternativa 1: ${percentage1.toFixed(2)}% - Alternativa 2: ${percentage2.toFixed(2)}%\nAlternativa 3: ${percentage3.toFixed(2)}% - Alternativa 4: ${percentage4.toFixed(2)}%`)
}

export const cancelar = (setConfirmandoJogo) => {
    setConfirmandoJogo(false)
}

export const pularPergunta = (botaoPular, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos) => {
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

export const pularPerguntaAleatoria = (setNumeroRodadaAleatoria, setIsPerguntaAleatoria, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos) => {
    setNumeroRodadaAleatoria(0)
    setIsPerguntaAleatoria(false)
    pularPergunta(0, modoJogo, pularIsDisable, setPularIsDisable, setPulos, pulos)
}

export const aceitarPerguntaAleatoria = (setIsPerguntaAleatoria) => {
    setIsPerguntaAleatoria(false)
}

const guardarValorPremio = (historico, seleçãoNome, tipo, valor, tiposOperação, setHistorico) => {
    const historicoTemp = realizarOperação(historico, seleçãoNome, tipo, valor, tiposOperação, '')
    setHistorico(historicoTemp)
    localStorage.setItem('historico', JSON.stringify(historico))
}

const guardarPontuaçãoParticipante = (pontuação, pontuaçãoParticipantes, setPontuaçãoParticipantes, seleçãoNome) => {
    const pontosParticipantes = pontuaçãoParticipantes

    pontosParticipantes.push({
        nome: seleçãoNome,
        pontos: pontuação
    })

    setPontuaçãoParticipantes(pontosParticipantes)
    localStorage.setItem('pontuaçãoParticipantes', JSON.stringify(pontuaçãoParticipantes))
}

export const comprarAjudaConvidados = (convidadosIsDisable, setConvidadosIsDisable, calcularSaldo, historico, seleçãoNome, tiposOperação) => {

    if (convidadosIsDisable) {
        setConvidadosIsDisable(false)

        if (1000 > calcularSaldo(historico.filter(h => h.cliente == seleçãoNome))) {
            throw new Error('Saldo insuficiente')
        }
        const historicoTemp = realizarOperação(historico, seleçãoNome, 'CP', '1000', tiposOperação, '')
        return historicoTemp;
    }
}

export const comprarAjudaCartas = (cartasIsDisable, setCartasIsDisable, calcularSaldo, historico, seleçãoNome, tiposOperação) => {

    if (cartasIsDisable) {
        setCartasIsDisable(false)

        if (1000 > calcularSaldo(historico.filter(h => h.cliente == seleçãoNome))) {
            throw new Error('Saldo insuficiente')
        }
        const historicoTemp = realizarOperação(historico, seleçãoNome, 'CP', '1000', tiposOperação)
        return historicoTemp;
    }
}

export function passarPerguntas(setAlternativasIsDisable, rodada, listaPerguntasJogo, RODADA_FACIL, RODADA_INTERMEDIARIA, RODADA_DIFICIL, setlistaPerguntasJogo, pulos) {
    setAlternativasIsDisable([false, false, false, false])
    if (rodada <= 1 && pulos < 1) {
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

export const organizarRanking = (pontuações) => {

    const rankingObj = pontuações.reduce((acc, pontuação) => {
        const { nome, pontos } = pontuação;

        if (!acc[nome] || pontos > acc[nome]) {
            acc[nome] = pontos;
        }

        return acc;

    }, {})

    const rankingList = Object.entries(rankingObj)
        .map(([nome, pontos]) => ({ nome, pontos }))
        .sort((a, b) => b.pontos - a.pontos);

    return rankingList;
}