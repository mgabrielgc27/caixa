import React from 'react'

export default function iconeTelaInicial(params) {
    return (
        <div className='text-center bg-white text-primary rounded-4 shadow shadow w-220px p-5'>
            <div className='row'>
                <i className={`${params.tamanhoIcone} ${params.icone} ${params.margemIcone}`}></i>
            </div>
            <div className='row'>
                <h1 className={params.paddingTexto}>{params.texto}</h1>
            </div>
        </div>
    )
}
