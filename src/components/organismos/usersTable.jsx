import React from 'react'
import Table from '../../components/table'
import { calcularSaldo } from '../../service/banco'

export default function usersTable(params) {
    return (
        <div className='col-lg-7'>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Clientes</th>
                            <th>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.listaClientes.map(l => {
                            return (
                                <tr key={l.nome}>
                                    <td>{l.nome}</td>
                                    <td>{calcularSaldo(params.historico.filter(h => h.cliente == l.nome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
