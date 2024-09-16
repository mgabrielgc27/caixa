import React from 'react'
import Select from '../../components/atomos/select'
import Button from '../../components/atomos/button'

export default function formIniciarJogo(params) {
    const {
        seleçãoNome,
        listaClientes,
        setSeleçãoNome,
        modoJogo,
        modosJogo,
        setModoJogo,
        verPerguntas,
        começarJogo,
        setConfirmandoJogo,
        setRodada, 
        rodada, 
        setJogando, 
        setPerguntaAtual, 
        listaPerguntasJogo,
        cancelar,
        confirmandoJogo
    } = params
    return (
        <div>

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

            {confirmandoJogo && <>
                <div className='d-flex flex-column mt-2'>
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
    )
}
