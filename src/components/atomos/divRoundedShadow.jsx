import React from 'react'

export default function divRoundedShadow(params) {
  return (
    <div className='row bg-white rounded-4 shadow-sm shadow w-220px p-3'>
      {params.children}
    </div>
  )
}
