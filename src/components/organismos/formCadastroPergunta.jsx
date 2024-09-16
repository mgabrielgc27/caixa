import React from 'react'
import Input from '../../components/atomos/input'
import Button from '../../components/atomos/button'
import Select from '../../components/atomos/select'

export default function formCadastroPergunta(params) {
    const {
        pergunta,
        setPergunta,
        resposta,
        setResposta,
        alternativa1,
        alternativa2,
        alternativa3,
        alternativa4,
        alternativas,
        setAlternativa1,
        setAlternativa2,
        setAlternativa3,
        setAlternativa4,
        categoria,
        categorias,
        setCategoria,
        dificuldade,
        dificuldades,
        setDificuldade,
        cadastrarPergunta,
        cancelar
    } = params
    return (
        <div className='col-lg-12 my-4'>

            <div className='container bg-white rounded-4 shadow-sm shadow w-220px p-3'>

                <Input
                    Nome='Pergunta'
                    Id='pergunta'
                    value={pergunta}
                    placeholder='Ex: 2 + 2 é igual a?'
                    onChange={e => setPergunta(e.target.value)} />

                <div className='d-flex'>
                    <div className='me-5'>
                        <Input
                            Nome='Alternativa 1'
                            Id='alternativa-1'
                            value={alternativa1}
                            placeholder='Digite a alternativa 1'
                            onChange={e => setAlternativa1(e.target.value)} />

                    </div>
                    <div className='me-5'>
                        <Input
                            Nome='Alternativa 2'
                            Id='alternativa-2'
                            value={alternativa2}
                            placeholder='Digite a alternativa 2'
                            onChange={e => setAlternativa2(e.target.value)} />
                    </div>
                    <div className='me-5'>
                        <Input
                            Nome='Alternativa 3'
                            Id='alternativa-3'
                            value={alternativa3}
                            placeholder='Digite a alternativa 3'
                            onChange={e => setAlternativa3(e.target.value)} />
                    </div>
                    <div className='me-5'>
                        <Input
                            Nome='Alternativa 4'
                            Id='alternativa-4'
                            value={alternativa4}
                            placeholder='Digite a alternativa 4'
                            onChange={e => setAlternativa4(e.target.value)} />
                    </div>
                </div>


                {alternativas[0] != '' && alternativas[1] != '' && alternativas[2] != '' && alternativas[3] != '' && <div className='py-2'>
                    <Select
                        Nome="Selecionar resposta"
                        Id="selecionar-resposta"
                        value={resposta}
                        primeiroValor='Escolha a resposta'
                        opções={alternativas}
                        onChange={e => setResposta(e.target.value)} />
                </div>}


                <div className='py-2'>
                    <Select
                        Nome="Selecionar categoria"
                        Id="selecionar-categoria"
                        value={categoria}
                        primeiroValor='Escolha a categoria'
                        opções={categorias}
                        onChange={e => setCategoria(e.target.value)} />
                </div>

                <div className='py-2'>
                    <Select
                        Nome="Selecionar dificuldade"
                        Id="selecionar-dificuldade"
                        value={dificuldade}
                        primeiroValor='Escolha a dificuldade'
                        opções={dificuldades}
                        onChange={e => setDificuldade(e.target.value)} />
                </div>

                <div className='d-flex flex-column pt-4'>
                    <Button
                        tipoBotao="btn btn-success"
                        onClick={cadastrarPergunta}>
                        Cadastrar Pergunta
                    </Button>

                </div>

                <div className='d-flex flex-column pt-2'>
                    <Button
                        tipoBotao="btn btn-danger"
                        onClick={cancelar}>
                        Cancelar
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
    )
}
