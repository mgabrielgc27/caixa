import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Cadastro from '../pages/cadastro/cadastro'
import Banco from '../pages/banco/banco'
import Home from '../pages/home/home'
import Perguntas from '../pages/jogo/perguntas'

export default function index() {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/cadastro",
            element: <Cadastro/>
        },
        {
            path: "/banco",
            element: <Banco/>
        },
        {
            path: "/perguntas",
            element: <Perguntas/>
        }
    ]);

    return (
            <RouterProvider router={router} />
    )
}
