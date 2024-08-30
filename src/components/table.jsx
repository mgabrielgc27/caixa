import React from 'react'

export default function table(params) {
    return (
        <div>
            <table
                className='table table-striped table-hover table-bordered border-secondary' >
                {params.children}
            </table>
        </div>
    )
}
