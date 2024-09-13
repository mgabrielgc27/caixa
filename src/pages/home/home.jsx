import React from 'react'
import Menu from '../../layout/menuNav'
import Header from '../../components/atomos/header'
import IconeTelaInicial from '../../components/atomos/iconeTelaInicial'

export default function home() {
  return (
    <div>
      <Menu />
      <div className='container'>
        <Header
          titulo='Home'
          icone='fa-solid fa-house' />

        <IconeTelaInicial
          texto='Seja bem-vindo'
          paddingTexto='p-3'
          icone='fa-solid fa-door-open'
          tamanhoIcone='fa-5x'
          margemIcone='mt-5' />
      </div>
    </div>
  )
}
