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
        // const lista = [
            // {
            //   "pergunta": "2 + 2 é igual a?",
            //   "alternativas": ["1", "2", "3", "4"],
            //   "resposta": "4",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o resultado de 5 - 3?",
            //   "alternativas": ["1", "2", "3", "4"],
            //   "resposta": "2",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 3 x 3?",
            //   "alternativas": ["6", "7", "8", "9"],
            //   "resposta": "9",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a metade de 10?",
            //   "alternativas": ["2", "4", "5", "6"],
            //   "resposta": "5",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 7 + 2?",
            //   "alternativas": ["8", "9", "10", "11"],
            //   "resposta": "9",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantos lados tem um quadrado?",
            //   "alternativas": ["2", "3", "4", "5"],
            //   "resposta": "4",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 10 - 4?",
            //   "alternativas": ["5", "6", "7", "4"],
            //   "resposta": "6",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o resultado de 8 ÷ 2?",
            //   "alternativas": ["2", "3", "4", "5"],
            //   "resposta": "4",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o dobro de 6?",
            //   "alternativas": ["10", "11", "12", "13"],
            //   "resposta": "12",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 1 + 1?",
            //   "alternativas": ["1", "2", "3", "4"],
            //   "resposta": "2",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 15 - 5?",
            //   "alternativas": ["5", "10", "15", "20"],
            //   "resposta": "10",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 4 + 6?",
            //   "alternativas": ["8", "9", "10", "11"],
            //   "resposta": "10",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantos segundos tem um minuto?",
            //   "alternativas": ["30", "60", "90", "120"],
            //   "resposta": "60",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 12 dividido por 4?",
            //   "alternativas": ["1", "2", "3", "4"],
            //   "resposta": "3",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o resultado de 6 + 7?",
            //   "alternativas": ["11", "12", "13", "14"],
            //   "resposta": "13",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o valor de 9 - 5?",
            //   "alternativas": ["3", "4", "5", "6"],
            //   "resposta": "4",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 4 x 2?",
            //   "alternativas": ["6", "7", "8", "9"],
            //   "resposta": "8",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 5 + 5?",
            //   "alternativas": ["8", "9", "10", "11"],
            //   "resposta": "10",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 8 menos 3?",
            //   "alternativas": ["4", "5", "6", "7"],
            //   "resposta": "5",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 7 + 5?",
            //   "alternativas": ["11", "12", "13", "14"],
            //   "resposta": "12",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o valor de x na equação 2x + 5 = 13?",
            //   "alternativas": ["3", "4", "5", "6"],
            //   "resposta": "4",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 7 x 8?",
            //   "alternativas": ["54", "56", "58", "60"],
            //   "resposta": "56",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o valor da raiz quadrada de 144?",
            //   "alternativas": ["10", "11", "12", "13"],
            //   "resposta": "12",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a área de um triângulo com base 10 e altura 5?",
            //   "alternativas": ["15", "25", "30", "50"],
            //   "resposta": "25",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 5 elevado ao quadrado?",
            //   "alternativas": ["15", "20", "25", "30"],
            //   "resposta": "25",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o valor de 10! (10 fatorial)?",
            //   "alternativas": ["3,628,800", "2,880", "5,040", "720"],
            //   "resposta": "3,628,800",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o perímetro de um círculo com raio 7?",
            //   "alternativas": ["22", "44", "28", "14"],
            //   "resposta": "44",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o MMC (Mínimo Múltiplo Comum) de 6 e 8?",
            //   "alternativas": ["12", "18", "24", "36"],
            //   "resposta": "24",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a derivada de 3x^2?",
            //   "alternativas": ["6x", "3x", "2x", "x^2"],
            //   "resposta": "6x",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 2^6?",
            //   "alternativas": ["32", "64", "16", "48"],
            //   "resposta": "64",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantos graus possui um ângulo reto?",
            //   "alternativas": ["45", "60", "90", "180"],
            //   "resposta": "90",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o volume de um cubo com aresta de 3 cm?",
            //   "alternativas": ["6 cm³", "9 cm³", "12 cm³", "27 cm³"],
            //   "resposta": "27 cm³",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 1/2 dividido por 1/4?",
            //   "alternativas": ["1", "2", "3", "4"],
            //   "resposta": "2",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o seno de 90 graus?",
            //   "alternativas": ["0", "0.5", "1", "Raiz de 2/2"],
            //   "resposta": "1",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 9^2 - 7^2?",
            //   "alternativas": ["16", "32", "48", "64"],
            //   "resposta": "32",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o valor de π (Pi) até duas casas decimais?",
            //   "alternativas": ["3.12", "3.14", "3.16", "3.18"],
            //   "resposta": "3.14",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o valor de log(100) na base 10?",
            //   "alternativas": ["1", "2", "10", "100"],
            //   "resposta": "2",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a média aritmética de 4, 8 e 12?",
            //   "alternativas": ["6", "8", "10", "12"],
            //   "resposta": "8",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quanto é 2/3 de 21?",
            //   "alternativas": ["7", "10", "12", "14"],
            //   "resposta": "14",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o maior divisor comum de 24 e 36?",
            //   "alternativas": ["4", "6", "12", "18"],
            //   "resposta": "12",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a solução da equação quadrática x^2 - 4x + 3 = 0?",
            //   "alternativas": ["x = 1 ou x = 3", "x = -1 ou x = 3", "x = 2 ou x = -2", "x = 1 ou x = -3"],
            //   "resposta": "x = 1 ou x = 3",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a integral de 3x^2 dx?",
            //   "alternativas": ["x^3 + C", "x^2 + C", "x^3/3 + C", "x^2/2 + C"],
            //   "resposta": "x^3 + C",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Resolva a equação log(x) + log(x - 3) = 1.",
            //   "alternativas": ["x = 5", "x = 10", "x = 7", "x = 3"],
            //   "resposta": "x = 5",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o determinante da matriz [[2, 3], [1, 4]]?",
            //   "alternativas": ["5", "7", "8", "10"],
            //   "resposta": "5",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a derivada de sin(x)cos(x)?",
            //   "alternativas": ["cos(2x)", "sin(2x)", "cos^2(x) - sin^2(x)", "2cos(x)sin(x)"],
            //   "resposta": "cos(2x)",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Se a série infinita 1 + x + x^2 + x^3 + ... converge, qual é a condição para x?",
            //   "alternativas": ["x > 1", "x < 1", "|x| < 1", "|x| > 1"],
            //   "resposta": "|x| < 1",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Resolva a equação diferencial dy/dx = y/x.",
            //   "alternativas": ["y = x^2 + C", "y = Cx", "y = ln(x) + C", "y = Ce^(x)"],
            //   "resposta": "y = Cx",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o limite de (sin(x)/x) quando x tende a 0?",
            //   "alternativas": ["0", "1", "-1", "Infinito"],
            //   "resposta": "1",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a transformada de Laplace de f(t) = e^(2t)?",
            //   "alternativas": ["1/(s-2)", "1/(s+2)", "1/(s^2 + 2)", "1/(2s)"],
            //   "resposta": "1/(s-2)",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a solução geral da equação diferencial y'' + y = 0?",
            //   "alternativas": ["y = A cos(x) + B sin(x)", "y = Ae^(x) + Be^(-x)", "y = Ax^2 + Bx + C", "y = ln(x) + C"],
            //   "resposta": "y = A cos(x) + B sin(x)",
            //   "categoria": "MATEMÁTICA",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o plural de 'cão'?",
            //   "alternativas": ["cães", "cãos", "cãoses", "caos"],
            //   "resposta": "cães",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o sinônimo de 'feliz'?",
            //   "alternativas": ["alegre", "triste", "sozinho", "cansado"],
            //   "resposta": "alegre",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Como se escreve o número 7 por extenso?",
            //   "alternativas": ["sete", "seti", "cete", "ceti"],
            //   "resposta": "sete",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a forma correta: 'nóis vai' ou 'nós vamos'?",
            //   "alternativas": ["nóis vai", "nós vamos", "nós ir", "nóis vamo"],
            //   "resposta": "nós vamos",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a classificação da palavra 'amor'?",
            //   "alternativas": ["Verbo", "Adjetivo", "Substantivo", "Advérbio"],
            //   "resposta": "Substantivo",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a conjugação correta do verbo 'cantar' na primeira pessoa do singular do presente?",
            //   "alternativas": ["canto", "cantei", "cantou", "cantamos"],
            //   "resposta": "canto",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual o significado de 'sinônimo'?",
            //   "alternativas": ["Palavra contrária", "Palavra semelhante", "Palavra errada", "Palavra composta"],
            //   "resposta": "Palavra semelhante",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual o feminino de 'garoto'?",
            //   "alternativas": ["garota", "garota", "menina", "menino"],
            //   "resposta": "garota",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a forma correta: 'traz' ou 'tras'?",
            //   "alternativas": ["traz", "tras", "trás", "tras'"],
            //   "resposta": "traz",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a sílaba tônica da palavra 'fácil'?",
            //   "alternativas": ["fá", "cil", "fi", "fa"],
            //   "resposta": "fá",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Como se escreve corretamente: 'exceção' ou 'execessão'?",
            //   "alternativas": ["exceção", "execessão", "excesão", "excessão"],
            //   "resposta": "exceção",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a função do ponto final?",
            //   "alternativas": ["Indicar uma pausa curta", "Finalizar uma frase", "Separar palavras", "Iniciar uma citação"],
            //   "resposta": "Finalizar uma frase",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a forma correta: 'houve' ou 'ouve'?",
            //   "alternativas": ["houve", "ouve", "houver", "ouver"],
            //   "resposta": "houve",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a grafia correta: 'assessor' ou 'acessor'?",
            //   "alternativas": ["assessor", "acessor", "asseçor", "asseçor"],
            //   "resposta": "assessor",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Como se chama o conjunto de regras para escrever corretamente?",
            //   "alternativas": ["Gramática", "Aritmética", "Caligrafia", "Ortografia"],
            //   "resposta": "Gramática",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual o plural de 'pão'?",
            //   "alternativas": ["pães", "pãos", "pãoses", "paos"],
            //   "resposta": "pães",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o antônimo de 'bom'?",
            //   "alternativas": ["ruim", "bom", "ótimo", "excelente"],
            //   "resposta": "ruim",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "O que é um adjetivo?",
            //   "alternativas": ["Palavra que qualifica um substantivo", "Palavra que indica uma ação", "Palavra que liga orações", "Palavra que define a quantidade"],
            //   "resposta": "Palavra que qualifica um substantivo",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Como se escreve o número 15 por extenso?",
            //   "alternativas": ["Quinze", "Quize", "Kiinze", "Kince"],
            //   "resposta": "Quinze",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o aumentativo de 'casa'?",
            //   "alternativas": ["casarão", "casona", "casada", "casita"],
            //   "resposta": "casarão",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // }
            //,
            // {
            //   "pergunta": "Qual é o sujeito da frase: 'O professor corrigiu os exercícios.'?",
            //   "alternativas": ["professor", "exercícios", "corrigiu", "O"],
            //   "resposta": "professor",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a função sintática do termo em destaque: 'Ana comprou um *presente* para a amiga.'?",
            //   "alternativas": ["Objeto indireto", "Objeto direto", "Complemento nominal", "Adjunto adverbial"],
            //   "resposta": "Objeto direto",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a figura de linguagem presente na frase: 'Ela é uma flor.'?",
            //   "alternativas": ["Metáfora", "Metonímia", "Antítese", "Ironia"],
            //   "resposta": "Metáfora",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a correta conjugação do verbo 'ver' no pretérito perfeito do indicativo para a terceira pessoa do singular?",
            //   "alternativas": ["viu", "via", "vê", "vendo"],
            //   "resposta": "viu",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "O que é um parônimo?",
            //   "alternativas": ["Palavras com sentidos opostos", "Palavras com sons parecidos e sentidos diferentes", "Palavras com a mesma grafia e diferentes significados", "Palavras usadas no plural"],
            //   "resposta": "Palavras com sons parecidos e sentidos diferentes",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em qual opção o verbo está na forma subjuntiva?",
            //   "alternativas": ["Se eu fosse", "Ele vai", "Eles foram", "Nós vamos"],
            //   "resposta": "Se eu fosse",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a função da vírgula na frase: 'Maria, venha aqui agora!'?",
            //   "alternativas": ["Separar vocativo", "Separar orações", "Indicar uma pausa breve", "Indicar uma explicação"],
            //   "resposta": "Separar vocativo",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a diferença entre 'a fim' e 'afim'?",
            //   "alternativas": ["Nenhuma diferença", "'A fim' indica propósito e 'afim' indica afinidade", "'Afim' indica propósito e 'a fim' indica afinidade", "'A fim' é um erro gramatical"],
            //   "resposta": "'A fim' indica propósito e 'afim' indica afinidade",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o advérbio na frase: 'Ele correu rapidamente para casa.'?",
            //   "alternativas": ["correu", "rapidamente", "casa", "para"],
            //   "resposta": "rapidamente",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o termo correto para designar o contrário de 'mal'? ",
            //   "alternativas": ["Bem", "Bom", "Ruim", "Ótimo"],
            //   "resposta": "Bem",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o uso correto da crase na frase: 'Vou ___ escola.'?",
            //   "alternativas": ["à", "a", "há", "á"],
            //   "resposta": "à",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a definição de um substantivo abstrato?",
            //   "alternativas": ["Palavra que dá nome a seres", "Palavra que dá nome a sentimentos, ações ou qualidades", "Palavra que descreve uma ação", "Palavra que modifica um substantivo"],
            //   "resposta": "Palavra que dá nome a sentimentos, ações ou qualidades",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a forma correta: 'a gente fomos' ou 'a gente foi'?",
            //   "alternativas": ["a gente foi", "a gente fomos", "a gente eram", "a gente seríamos"],
            //   "resposta": "a gente foi",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a figura de linguagem em: 'Ela chorou rios de lágrimas.'?",
            //   "alternativas": ["Hipérbole", "Metáfora", "Eufemismo", "Paradoxo"],
            //   "resposta": "Hipérbole",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a forma correta do verbo 'pôr' no futuro do presente?",
            //   "alternativas": ["porei", "por", "pôrei", "poer"],
            //   "resposta": "porei",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "O que é uma oração subordinada?",
            //   "alternativas": ["Uma oração independente", "Uma oração que depende de outra para ter sentido completo", "Uma frase sem verbo", "Um tipo de advérbio"],
            //   "resposta": "Uma oração que depende de outra para ter sentido completo",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a forma correta de escrever a palavra no plural: 'mão'?",
            //   "alternativas": ["mãos", "mãons", "mões", "manos"],
            //   "resposta": "mãos",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a diferença entre 'mas' e 'mais'?",
            //   "alternativas": ["'Mas' indica oposição e 'mais' indica quantidade", "'Mais' indica oposição e 'mas' indica quantidade", "'Mas' indica soma e 'mais' indica contradição", "Nenhuma diferença"],
            //   "resposta": "'Mas' indica oposição e 'mais' indica quantidade",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em qual situação se usa 'há' em vez de 'a'?",
            //   "alternativas": ["Para indicar tempo decorrido", "Para indicar movimento", "Para indicar futuro", "Para unir orações"],
            //   "resposta": "Para indicar tempo decorrido",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual a função da conjunção 'porque' em uma frase?",
            //   "alternativas": ["Indicar causa", "Indicar tempo", "Indicar contraste", "Indicar condição"],
            //   "resposta": "Indicar causa",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // }
            // {
            //   "pergunta": "Qual é o efeito estilístico do uso da anacoluto na frase: 'Eu, que não entendo de política, acho isso um absurdo.'?",
            //   "alternativas": ["Ênfase na opinião do falante", "Contradição de ideias", "Interrupção do fluxo da frase", "Ritmo acelerado"],
            //   "resposta": "Interrupção do fluxo da frase",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a diferença entre hipérbato e anástrofe?",
            //   "alternativas": ["Hipérbato é a inversão completa da ordem sintática; anástrofe é a inversão de termos vizinhos", "Ambos são a mesma figura de linguagem", "Hipérbato é uma figura de repetição, anástrofe é de sentido", "Anástrofe é a inversão completa da ordem sintática; hipérbato é a inversão de termos vizinhos"],
            //   "resposta": "Hipérbato é a inversão completa da ordem sintática; anástrofe é a inversão de termos vizinhos",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a função sintática de 'se' na frase: 'Vendeu-se a casa rapidamente'?",
            //   "alternativas": ["Pronome reflexivo", "Partícula expletiva", "Partícula apassivadora", "Conjunção subordinativa"],
            //   "resposta": "Partícula apassivadora",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a função de um pronome relativo em uma oração?",
            //   "alternativas": ["Substituir substantivos", "Introduzir uma oração subordinada adjetiva", "Indicar posse", "Conectar duas orações independentes"],
            //   "resposta": "Introduzir uma oração subordinada adjetiva",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em que caso ocorre a crase em 'Vou ___ aquela cidade.'?",
            //   "alternativas": ["à", "a", "há", "ao"],
            //   "resposta": "à",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a classificação do período: 'Embora estivesse chovendo, fomos à praia.'?",
            //   "alternativas": ["Período composto por subordinação", "Período composto por coordenação", "Período simples", "Período misto"],
            //   "resposta": "Período composto por subordinação",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em que contexto se deve usar o verbo 'intervir' corretamente?",
            //   "alternativas": ["Ele interveio na reunião", "Ele intervem na reunião", "Ele intervirá na reunião", "Ele interver na reunião"],
            //   "resposta": "Ele interveio na reunião",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o efeito de sentido da elipse na frase: 'Nem ele gostava de brócolis, nem ela.'?",
            //   "alternativas": ["Reforçar a ideia de oposição", "Diminuir a importância do segundo termo", "Evitar repetição de palavras", "Criar um suspense"],
            //   "resposta": "Evitar repetição de palavras",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a diferença semântica entre 'imigrante' e 'emigrante'?",
            //   "alternativas": ["Imigrante é quem chega a um país; emigrante é quem sai de um país", "Ambos são sinônimos", "Emigrante é quem chega a um país; imigrante é quem sai de um país", "Imigrante é quem viaja sem destino"],
            //   "resposta": "Imigrante é quem chega a um país; emigrante é quem sai de um país",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a classificação morfológica da palavra em destaque: 'O *meu* livro está na mesa.'?",
            //   "alternativas": ["Pronome pessoal", "Pronome possessivo", "Pronome demonstrativo", "Pronome indefinido"],
            //   "resposta": "Pronome possessivo",
            //   "categoria": "PORTUGUÊS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // }
            // {
            //   "pergunta": "Qual é o maior país do mundo em extensão territorial?",
            //   "alternativas": ["Brasil", "Estados Unidos", "Rússia", "China"],
            //   "resposta": "Rússia",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o planeta mais próximo do Sol?",
            //   "alternativas": ["Terra", "Marte", "Mercúrio", "Vênus"],
            //   "resposta": "Mercúrio",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantos continentes existem no mundo?",
            //   "alternativas": ["5", "6", "7", "8"],
            //   "resposta": "7",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a capital da França?",
            //   "alternativas": ["Londres", "Paris", "Madri", "Roma"],
            //   "resposta": "Paris",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o animal terrestre mais rápido do mundo?",
            //   "alternativas": ["Leão", "Cavalo", "Guepardo", "Elefante"],
            //   "resposta": "Guepardo",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em que continente fica o Brasil?",
            //   "alternativas": ["África", "Ásia", "Europa", "América do Sul"],
            //   "resposta": "América do Sul",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a língua oficial do Brasil?",
            //   "alternativas": ["Inglês", "Português", "Espanhol", "Francês"],
            //   "resposta": "Português",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem pintou a Mona Lisa?",
            //   "alternativas": ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
            //   "resposta": "Leonardo da Vinci",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o maior oceano do mundo?",
            //   "alternativas": ["Atlântico", "Índico", "Pacífico", "Ártico"],
            //   "resposta": "Pacífico",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantas cores há na bandeira do Brasil?",
            //   "alternativas": ["3", "4", "5", "6"],
            //   "resposta": "4",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a montanha mais alta do mundo?",
            //   "alternativas": ["Monte Everest", "Monte Kilimanjaro", "Monte Fuji", "Monte Aconcágua"],
            //   "resposta": "Monte Everest",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantos estados tem o Brasil?",
            //   "alternativas": ["24", "26", "27", "30"],
            //   "resposta": "26",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o nome do famoso físico que desenvolveu a teoria da relatividade?",
            //   "alternativas": ["Isaac Newton", "Albert Einstein", "Nikola Tesla", "Stephen Hawking"],
            //   "resposta": "Albert Einstein",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em qual país fica a Torre Eiffel?",
            //   "alternativas": ["Espanha", "Itália", "França", "Alemanha"],
            //   "resposta": "França",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem escreveu 'Dom Quixote'?",
            //   "alternativas": ["William Shakespeare", "Miguel de Cervantes", "Jorge Luis Borges", "Gabriel García Márquez"],
            //   "resposta": "Miguel de Cervantes",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a moeda oficial dos Estados Unidos?",
            //   "alternativas": ["Euro", "Libra", "Dólar", "Iene"],
            //   "resposta": "Dólar",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o maior deserto do mundo?",
            //   "alternativas": ["Saara", "Deserto do Atacama", "Deserto da Arábia", "Deserto da Antártica"],
            //   "resposta": "Deserto da Antártica",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o rio mais longo do mundo?",
            //   "alternativas": ["Rio Amazonas", "Rio Nilo", "Rio Yangtzé", "Rio Mississippi"],
            //   "resposta": "Rio Nilo",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quantos lados tem um hexágono?",
            //   "alternativas": ["5", "6", "7", "8"],
            //   "resposta": "6",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem foi o primeiro homem a pisar na Lua?",
            //   "alternativas": ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"],
            //   "resposta": "Neil Armstrong",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "FÁCIL",
            //   "foiPerguntada": false
            // }
            // {
            //   "pergunta": "Quem foi o primeiro presidente dos Estados Unidos?",
            //   "alternativas": ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
            //   "resposta": "George Washington",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em que ano ocorreu a Revolução Francesa?",
            //   "alternativas": ["1789", "1799", "1776", "1804"],
            //   "resposta": "1789",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a capital do Canadá?",
            //   "alternativas": ["Toronto", "Vancouver", "Montreal", "Ottawa"],
            //   "resposta": "Ottawa",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual foi a primeira civilização conhecida a utilizar a escrita?",
            //   "alternativas": ["Suméria", "Egito Antigo", "Império Romano", "Grécia Antiga"],
            //   "resposta": "Suméria",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o nome do líder político que governou Cuba por quase 50 anos?",
            //   "alternativas": ["Che Guevara", "Raúl Castro", "Fidel Castro", "Hugo Chávez"],
            //   "resposta": "Fidel Castro",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em qual cidade ocorreu o famoso julgamento das Bruxas de Salém?",
            //   "alternativas": ["Nova York", "Boston", "Salém", "Filadélfia"],
            //   "resposta": "Salém",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a montanha mais alta do continente africano?",
            //   "alternativas": ["Monte Quênia", "Monte Atlas", "Monte Kilimanjaro", "Monte Ruwenzori"],
            //   "resposta": "Monte Kilimanjaro",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem é o autor do livro '1984'?",
            //   "alternativas": ["Aldous Huxley", "George Orwell", "Ray Bradbury", "Jules Verne"],
            //   "resposta": "George Orwell",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual foi o evento que marcou o início da Segunda Guerra Mundial?",
            //   "alternativas": ["Ataque a Pearl Harbor", "Invasão da Polônia pela Alemanha", "Tratado de Versalhes", "Batalha de Stalingrado"],
            //   "resposta": "Invasão da Polônia pela Alemanha",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual país é conhecido como a Terra do Sol Nascente?",
            //   "alternativas": ["China", "Coreia do Sul", "Japão", "Tailândia"],
            //   "resposta": "Japão",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem descobriu a Penicilina?",
            //   "alternativas": ["Alexander Fleming", "Marie Curie", "Louis Pasteur", "Gregor Mendel"],
            //   "resposta": "Alexander Fleming",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a moeda oficial do Japão?",
            //   "alternativas": ["Won", "Iene", "Yuan", "Dólar"],
            //   "resposta": "Iene",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o maior planeta do Sistema Solar?",
            //   "alternativas": ["Terra", "Júpiter", "Saturno", "Marte"],
            //   "resposta": "Júpiter",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual país é conhecido pelo seu famoso muro, que caiu em 1989?",
            //   "alternativas": ["Polônia", "Alemanha", "Rússia", "Hungria"],
            //   "resposta": "Alemanha",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o símbolo químico da água?",
            //   "alternativas": ["O2", "H2O", "CO2", "HO"],
            //   "resposta": "H2O",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem foi o imperador romano que oficializou o Cristianismo no Império?",
            //   "alternativas": ["Nero", "Constantino", "Augusto", "Marco Aurélio"],
            //   "resposta": "Constantino",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual filósofo é conhecido por sua frase 'Penso, logo existo'?",
            //   "alternativas": ["Platão", "René Descartes", "Aristóteles", "Sócrates"],
            //   "resposta": "René Descartes",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o nome do primeiro satélite artificial lançado ao espaço?",
            //   "alternativas": ["Apollo", "Sputnik", "Voyager", "Hubble"],
            //   "resposta": "Sputnik",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Em que ano o homem pisou na Lua pela primeira vez?",
            //   "alternativas": ["1965", "1969", "1972", "1980"],
            //   "resposta": "1969",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o nome do mar que separa a Europa da África?",
            //   "alternativas": ["Mar do Norte", "Mar Báltico", "Mar Mediterrâneo", "Mar Adriático"],
            //   "resposta": "Mar Mediterrâneo",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "INTERMEDIÁRIO",
            //   "foiPerguntada": false
            // }
            // {
            //   "pergunta": "Qual é o nome do primeiro satélite artificial a orbitar a Terra?",
            //   "alternativas": ["Apollo 11", "Hubble", "Sputnik 1", "Vostok 1"],
            //   "resposta": "Sputnik 1",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o maior lago de água doce do mundo em termos de volume?",
            //   "alternativas": ["Lago Baikal", "Lago Superior", "Lago Victoria", "Lago Huron"],
            //   "resposta": "Lago Baikal",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o elemento químico com o símbolo 'Hg'?",
            //   "alternativas": ["Hidrogênio", "Mercúrio", "Hélio", "Cálcio"],
            //   "resposta": "Mercúrio",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o nome do teorema matemático que estabelece a relação entre os lados de um triângulo retângulo?",
            //   "alternativas": ["Teorema de Pitágoras", "Teorema de Tales", "Teorema de Euclides", "Teorema de Fermat"],
            //   "resposta": "Teorema de Pitágoras",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual país sediou os Jogos Olímpicos de Inverno de 2014?",
            //   "alternativas": ["Canadá", "Noruega", "Rússia", "Suíça"],
            //   "resposta": "Rússia",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual foi o nome da nave espacial que levou o homem à Lua pela primeira vez?",
            //   "alternativas": ["Apollo 11", "Columbia", "Endeavour", "Challenger"],
            //   "resposta": "Apollo 11",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Quem foi o autor da obra 'A Origem das Espécies'?",
            //   "alternativas": ["Charles Darwin", "Jean-Baptiste Lamarck", "Gregor Mendel", "Francis Crick"],
            //   "resposta": "Charles Darwin",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é a fórmula química do ácido sulfúrico?",
            //   "alternativas": ["H2SO4", "HCl", "HNO3", "CH3COOH"],
            //   "resposta": "H2SO4",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // },
            // {
            //   "pergunta": "Qual é o nome do protocolo de comunicação utilizado para enviar e-mails?",
            //   "alternativas": ["HTTP", "FTP", "SMTP", "IMAP"],
            //   "resposta": "SMTP",
            //   "categoria": "CONHECIMENTOS GERAIS",
            //   "dificuldade": "DIFÍCIL",
            //   "foiPerguntada": false
            // }
        //     {
        //       "pergunta": "Quem foi o líder da Revolução Russa de 1917?",
        //       "alternativas": ["Leon Trotsky", "Vladimir Lenin", "Joseph Stalin", "Mikhail Gorbachev"],
        //       "resposta": "Vladimir Lenin",
        //       "categoria": "CONHECIMENTOS GERAIS",
        //       "dificuldade": "DIFÍCIL",
        //       "foiPerguntada": false
        //     }
        // ]

        // const lista2 = [...listaPerguntas,...lista]
        // localStorage.setItem('listaPerguntas',JSON.stringify(lista2))
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

                            {<div className='d-flex flex-column pt-4'>
                                <Button
                                    tipoBotao="btn btn-success"
                                    onClick={inicializarPerguntasDefault}>
                                    Cadastrar Perguntas Default
                                </Button>

                            </div>}

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
