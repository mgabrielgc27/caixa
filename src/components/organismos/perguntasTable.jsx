import React from 'react'
import Table from '../atomos/table'
import Button from '../atomos/button'

export default function perguntasTable(params) {
    return (
        <div className='col-lg-12'>
            <div className='rounded-4 bg-white shadow-sm shadow w-220px p-3'>
                <h3 className='mb-3'>Perguntas Cadastradas</h3>
                <div style={{ maxHeight: '464px', overflowY: 'auto' }} className='row border border-primary table-responsive mx-2'>
                    <Table>
                        <tbody>
                            {params.listaPerguntas.map(l => {
                                return (
                                    <tr key={l.pergunta}>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.pergunta}
                                        </td >
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.alternativas[0]}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.alternativas[1]}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.alternativas[2]}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.alternativas[3]}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.resposta}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.categoria}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            {l.dificuldade}
                                        </td>
                                        <td style={{ verticalAlign: 'middle' }}>
                                            <div className='pt-2'>
                                                <Button
                                                    tipoBotao="btn btn-sm btn-outline-warning"
                                                    onClick={() => params.editarPergunta(l.pergunta)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                </Button>
                                            </div>
                                            <div className='py-2'>
                                                <Button
                                                    tipoBotao="btn btn-sm btn-outline-danger"
                                                    onClick={() => params.excluirPergunta(l.pergunta)}>
                                                    <i className="fa-solid fa-trash"></i>
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className='d-flex mt-3 mx-2'>
                    <div className='d-flex col-lg-8 align-items-center justify-content-start'>
                        <div className='me-5'><span className='border-end border-bottom border-secondary px-2 me-2'>{params.listaPerguntas.filter(l => l.dificuldade === 'FÁCIL').length}</span>Faceis</div>
                        <div className='me-5'><span className='border-end border-bottom border-secondary px-2 me-2'>{params.listaPerguntas.filter(l => l.dificuldade === 'INTERMEDIÁRIO').length}</span>Intermediarias</div>
                        <div className='me-5'><span className='border-end border-bottom border-secondary px-2 me-2'>{params.listaPerguntas.filter(l => l.dificuldade === 'DIFÍCIL').length}</span>Dificeis</div>
                    </div>
                    <div className='col-lg-4'>
                        <div className='d-flex justify-content-end'>
                            <Button
                                tipoBotao="btn btn-primary rounded-5 px-3"
                                onClick={params.adicionarPerguntas}>
                                <div><i className="fa-solid fa-plus"></i> Add </div>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
