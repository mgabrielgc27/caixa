import React from 'react'

export default function input(params) {
  return (
    <div className='py-3'>
        <label 
            htmlFor={params.Id}
            className='form-label' >
                {params.Nome}
        </label>
        <input
            className='form-control py-1'
            type="text"
            id={params.Id}
            onChange={params.onChange}
            placeholder={params.placeholder}
            value={params.value} />
    </div>
  )
}
