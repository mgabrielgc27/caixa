import React from 'react'
import Table from '../atomos/table'
import Button from '../atomos/button'
import { calcularSaldo } from '../../service/banco'

export default function usersTable(params) {
    return (
        <div className='col-lg-7'>
            <div>
                <Table>
                    <thead>
                        <tr>
                            <th>Clientes</th>
                            <th colSpan={2}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {params.listaClientes.map(l => {
                            return (
                                <tr key={l.nome}>
                                    <td>{l.nome}</td>
                                    <td>{calcularSaldo(params.historico.filter(h => h.cliente == l.nome)).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</td>
                                    <td className='text-end'>
                                        <Button
                                            tipoBotao="btn btn-sm btn-danger"
                                            onClick={() => params.deletar(l.nome)}>
                                            <i className="fa-solid fa-trash"></i>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
