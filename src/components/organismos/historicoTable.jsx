import React from 'react'
import Table from '../../components/atomos/table'
import { filtrarHistoricoPorData } from '../../service/banco'

export default function historicoTable(params) {
    const { seleçãoNome, historico, tiposOperação } = params
    return (
        <>
            {seleçãoNome != '' && <div className='col-lg-8'>
                <div className='row ms-2'>
                    <h3 className='bg-success br-gradient text-white p-3 rounded'><i className="fa-solid fa-receipt me-3"></i>Extrato da conta</h3>
                </div>
                <div style={{ maxHeight: '494px', overflowY: 'auto' }} className='row bg-white rounded-4 shadow-sm shadow w-220px p-3 ms-2'>
                    <div className='table-responsive'>
                        {filtrarHistoricoPorData(historico.filter(h => h.cliente == seleçãoNome)).slice().reverse().map(([data, transações]) => (
                            <div key={data}>
                                <h3>{data === new Date().toLocaleDateString() ? 'Hoje' : data}</h3>
                                <Table>
                                    <tbody>
                                        {transações.map((t, index) => {

                                            const cor = t.tipo === 'SQ' || t.tipo === 'CP' ? '#dc3545' : '#198754';

                                            return (
                                                
                                                <tr key={index}>
                                                    <td className='text-start'>{t.horario}</td>
                                                    <td className='text-start'>{t.tipo == 'DP' ?
                                                        tiposOperação[0].rotulo :
                                                        t.tipo == 'SQ' ?
                                                            tiposOperação[1].rotulo :
                                                            t.tipo == 'VI' ?
                                                                tiposOperação[2].rotulo :
                                                                t.tipo == 'TC' ?
                                                                    tiposOperação[3].rotulo + ' de ' + t.remetente :
                                                                    t.tipo == 'TD' ?
                                                                        tiposOperação[4].rotulo + ' para ' + t.destinatario : tiposOperação[5].rotulo}
                                                    </td>
                                                    <td className='text-end'>{parseFloat(t.valor).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                                    <td style={{maxWidth: '60px'}} className='text-end'><div className='fa-solid fa-dollar-sign'
                                                        style={{
                                                            paddingInline: '9px',
                                                            paddingTop: '5px',
                                                            paddingBottom: '5px',
                                                            backgroundColor: cor,
                                                            fontSize: '20px',
                                                            color: 'white',
                                                            borderRadius: '5px',
                                                        }}>
                                                    </div></td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        ))
                        }
                    </div>
                </div>
            </div >}
        </>
    )
}
