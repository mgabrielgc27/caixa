import React from 'react'

export default function input(params) {
  return (
    <div className='py-3'>
        <label
            key={params.key}
            htmlFor={params.Id}
            className='form-label' >
                {params.Nome}
        </label>
        <input
            key={params.key}
            className='form-control py-1'
            type="text"
            id={params.Id}
            onChange={params.onChange}
            placeholder={params.placeholder}
            value={params.value} />
    </div>
  )
}
