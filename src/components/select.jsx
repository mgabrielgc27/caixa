import React from 'react'

export default function select(params) {
    return (
        <div>
            <label
                htmlFor={params.Id}
                className='form-label' >
                {params.Nome}
            </label>
            <select
            id={params.Id}
            onChange={params.onChange}
            className="form-select" >
                <option value="">{params.primeiroValor}</option>
                {params.Id == 'tipo-operação' ?
                params.opções.map(o => { return (<option key={o.Id} value={o.valor}>{o.rotulo}</option>)}) : 
                params.Id == 'selecionar-cliente' ?
                params.opções.map(o => { return (<option key={o.nome} value={o.nome}>{o.nome}</option>)}) :
                params.opções.map(o => { return (<option key={o} value={o}>{o}</option>)})}

            </select>
        </div>
    )
}