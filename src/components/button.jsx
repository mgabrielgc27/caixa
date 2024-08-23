import React from 'react'

export default function button(params) {
    return (
        <>
            <button
                type='button'
                className={params.tipoBotao}
                onClick={params.onClick} >
                {params.children}
            </button>
        </>
    )
}
