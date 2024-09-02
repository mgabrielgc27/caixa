import React from 'react'
import Menu from '../../layout/menuNav'
import Header from '../../components/header'

export default function home() {
  return (
    <div>
      <Menu />
      <div className='container'>
        <Header
          titulo='Home'
          icone='fa-solid fa-house' />
        <div className='text-center bg-white text-primary rounded-4 shadow shadow w-220px p-5'>
          <div className='row'>
            <i className="fa-5x fa-solid fa-door-open mt-5"></i>

          </div>
          <div className='row'>
            <h1 className='p-4'>Seja Bem-vindo</h1>
          </div>

        </div>
      </div>
    </div>
  )
}
