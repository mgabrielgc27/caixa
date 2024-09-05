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
        'FÁCIL', 'INTERMÉDIARIO', 'DIFÍCIL'
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

        setAlternativas([alternativa1.toUpperCase(),alternativa2.toUpperCase(),alternativa3.toUpperCase(),alternativa4.toUpperCase()])
    }, [alternativa1,alternativa2,alternativa3,alternativa4])

    function cadastrarPergunta() {

        if (!pergunta) {
            alert('Digite uma pergunta válida')
            return
        }

        if (!alternativas[0]) {
            alert('Digite a primeira alternativa')
            return
        }

        if (!alternativas[1]) {
            alert('Digite a segunda alternativa')
            return
        }

        if (!alternativas[2]) {
            alert('Digite a terceira alternativa')
            return
        }

        if (!alternativas[3]) {
            alert('Digite a quarta alternativa')
            return
        }

        if (!resposta) {
            alert('Digite uma resposta')
            return
        }

        if(!categoria){
            alert('Escolha uma categoria')
            return
        }

        if (!dificuldade) {
            alert('Escolha uma dificuldade')
            return
        }

        if (listaPerguntas.filter(l => l.pergunta == pergunta).length > 0) {
            alert('Pergunta ja existe')
            setPergunta('')
            return
        }

        const alternativasTemp = alternativas;

        if (alternativasTemp.filter(a => a === alternativas[0]).length > 1) {
            alert('Alternativa ja existe')
            return
        }

        if (alternativasTemp.filter(a => a === alternativas[1]).length > 1) {
            alert('Alternativa ja existe')
            return
        }

        if (alternativasTemp.filter(a => a === alternativas[2]).length > 1) {
            alert('Alternativa ja existe')
            return
        }

        if (alternativasTemp.filter(a => a === alternativas[3]).length > 1) {
            alert('Alternativa ja existe')
            return
        }

        if (!alternativasTemp.find(a => a === resposta)) {
            alert('Resposta não confere com as alternativas')
            return
        }

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
    }

    const inicializarPerguntasDefault = () => {
        alert('oi')
        const lista = [{"pergunta":"2 + 2 =?","alternativas":["1","2","3","4"],"resposta":"4","dificuldade":"FÁCIL","categoria":"Matemática","foiPerguntada":false},{"pergunta":"4 X 5 =?","alternativas":["15","20","25","30"],"resposta":"20","dificuldade":"FÁCIL","categoria":"Matemática","foiPerguntada":false},{"pergunta":"COMO É O NOME DO LUGAR ONDE AS PESSOAS VÃO TRATAR DE DOENÇAS?","alternativas":["DELEGACIA","CEMITÉRIO","HOSPITAL","SHOPPING"],"resposta":"HOSPITAL","dificuldade":"FÁCIL","categoria":"Conhecimentos Gerais","foiPerguntada":false},{"pergunta":"QUAL PALAVRA ESTÁ CORRETA?","alternativas":["VETILADOR","AR-CONDICIONADO","GUARDA CHUVA","LAPIZ"],"resposta":"AR-CONDICIONADO","dificuldade":"FÁCIL","categoria":"Português","foiPerguntada":false},{"pergunta":"QUANTAS SÍLABAS TEM A PALAVRA \"ANIL\"","alternativas":["1","2","3","4"],"resposta":"2","dificuldade":"FÁCIL","categoria":"PORTUGUÊS","foiPerguntada":false},{"pergunta":"QUAL O VALOR DA RAIZ QUADRADA DE 144","alternativas":["12","13","14","15"],"resposta":"12","dificuldade":"INTERMÉDIARIO","categoria":"Matemática","foiPerguntada":false},{"pergunta":"ALBERT EINSTEIN CRIOU QUAL TEORIA?","alternativas":["TEORIA DOS GASES NOBRES","TEORIA DA GRAVITAÇÃO UNIVERSAL","TEORIA DO BIG BANG","TEORIA DA RELATIVIDADE"],"resposta":"TEORIA DA RELATIVIDADE","dificuldade":"INTERMÉDIARIO","categoria":"Ciências","foiPerguntada":false},{"pergunta":"QUAL O MELHOR AMIGO DO BOB-ESPONJA?","alternativas":["SANDY","SENHOR SERIGUEIJO","PATRICK","KENNY"],"resposta":"PATRICK","dificuldade":"INTERMÉDIARIO","categoria":"Filmes/Desenhos","foiPerguntada":false},{"pergunta":"QUEM É O PERSONAGEM QUE É UM RATO E CONHECIDO COMO MASCOTE DA DISNEY?","alternativas":["MICKEY MOUSE","PATO DONALT","JERRY","PICA-PAU"],"resposta":"MICKEY MOUSE","dificuldade":"INTERMÉDIARIO","categoria":"Filmes/Desenhos","foiPerguntada":false},{"pergunta":"QUAL A CAPITAL DO ACRE?","alternativas":["FORTALEZA","SALVADOR","PALMAS","RIO BRANCO"],"resposta":"RIO BRANCO","dificuldade":"INTERMÉDIARIO","categoria":"Geografia","foiPerguntada":false},{"pergunta":"QUAL O MENOR PAÍS DO MUNDO?","alternativas":["FRANÇA","JAPÃO","VATICANO","RÚSSIA"],"resposta":"VATICANO","dificuldade":"INTERMÉDIARIO","categoria":"Geografia","foiPerguntada":false},{"pergunta":"QUANTOS CONTINENTES EXISTEM NO MUNDO","alternativas":["3","4","5","6"],"resposta":"6","dificuldade":"FÁCIL","categoria":"Geografia","foiPerguntada":false},{"pergunta":"ANTES O MUNDO ERA UNIDO EM APENAS UM CONTINENTE, QUAL O NOME DESSE CONTINENTE?","alternativas":["PANGEIA","ILEIA","CENTROPEIA","POLONEIA"],"resposta":"PANGEIA","dificuldade":"DIFÍCIL","categoria":"Geografia","foiPerguntada":false},{"pergunta":"QUAL O NOME DA CIÊNCIA ESTUDA O COMPORTAMENTO HUMANO E OS PROCESSOS QUE INTERLIGAM OS INDIVÍDUOS EM ASSOCIAÇÕES, GRUPOS E INSTITUIÇÕES?","alternativas":["FILOSÓFIA","PSICOLÓGIA","GEOPOLÍTICA","SOCIOLOGIA"],"resposta":"SOCIOLOGIA","dificuldade":"DIFÍCIL","categoria":"Sociologia","foiPerguntada":false},{"pergunta":"QUAL O VALOR DO NÚMERO \"PI\" COM DUAS CASAS DECIMAIS","alternativas":["2,14","3,14","4,14","4,13"],"resposta":"3,14","dificuldade":"DIFÍCIL","categoria":"Matemática","foiPerguntada":false},{"pergunta":"EM QUE ANO A ONU FOI CRIADA?","alternativas":["1930","1945","1989","2000"],"resposta":"1945","dificuldade":"DIFÍCIL","categoria":"Conhecimentos Gerais","foiPerguntada":false},{"pergunta":"O QUE É VIA LACTEA","alternativas":["MARCA DE LEITE","CONSTELAÇÃO","GALAXIA","NOME DE CARRO"],"resposta":"GALAXIA","dificuldade":"DIFÍCIL","categoria":"Conhecimentos Gerais","foiPerguntada":false},{"pergunta":"QUEM É O PAR ROMANTICO DO TARZAN","alternativas":["DIANA","LOUIS LANE","JANE","CHITA"],"resposta":"JANE","dificuldade":"DIFÍCIL","categoria":"Filmes/Desenhos","foiPerguntada":false}]
        localStorage.setItem('listaPerguntas',JSON.stringify(lista))
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
                                        <td>Intermédiario</td>
                                        <td>{listaPerguntas.filter(l => l.dificuldade == 'INTERMÉDIARIO').length}</td>
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
