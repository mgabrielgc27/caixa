import React from 'react'

export default function button(params) {
    return (
        <>
            <button
                disabled={params.disabled}
                type='button'
                className={params.tipoBotao}
                onClick={params.onClick} >
                {params.children}
            </button>
        </>
    )
}
