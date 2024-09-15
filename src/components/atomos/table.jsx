import React from 'react'

export default function table(params) {
    return (
        <div className='table-responsive'>
            <table
                className='table table-hover' >
                {params.children}
            </table>
        </div>
    )
}
