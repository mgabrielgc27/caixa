import React from 'react'
import Table from '../../components/atomos/table'
import { organizarRanking } from '../../service/jogo'

export default function rankingTable(params) {
    return (
        <div className='row'>
            <div className='col-lg-6'>
                <div className="table-responsive border border-primary" style={{ maxHeight: '164px', overflowY: 'auto' }}>
                    <Table>

                        <thead>
                            <tr><th>Ranking</th></tr>
                        </thead>
                        <tbody>
                            {organizarRanking(params.pontuaçãoParticipantes).map(p => {
                                return (
                                    <tr key={p.nome}><td>{p.nome}: {p.pontos}</td></tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div>
            <div className='col-lg-6'>
                <div className="table-responsive border border-primary" style={{ maxHeight: '164px', overflowY: 'auto' }}>
                    <Table>
                        <thead>
                            <tr>
                                <th>Historico de pontuações</th>
                            </tr>
                        </thead>

                        <tbody>
                            {params.pontuaçãoParticipantes.map((p, index) => {
                                return (
                                    <tr key={index}><td>{p.nome}: {p.pontos}</td></tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
            </div >
        </div >
    )
}
