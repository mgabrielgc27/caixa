import React from 'react'

export default function header(params) {
    return (
        <div className={`d-flex align-items-center p-3 my-2 text-white rounded shadow-sm ${params.cor || 'bg-primary'}`} >

            <i className={`me-3 fa-2xl ${params.icone || 'fa-solid fa-folder'}`}></i>
            <div className="lh-1">
                <h1 className="h5 mb-0 text-white lh-1">{params.titulo}</h1>
                <small>{params.subtitulo}</small>
            </div>
        </div>
    )
}
