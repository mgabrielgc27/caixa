import React from 'react'

export default function input(params) {
  return (
    <>
        <label 
            htmlFor={params.Id}
            className='form-label' >
                {params.Nome}
        </label>
        <input
            className='form-control'
            type="text"
            id={params.Id}
            onChange={params.onChange}
            placeholder={params.placeholder}
            value={params.value} />
    </>
  )
}
