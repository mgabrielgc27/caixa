import React from 'react'
import { Link } from 'react-router-dom'

export default function menuNav() {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand text-white" href="#">ERP Web</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className='nav-link active text-white' to={'/'}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link active text-white' to={'/cadastro'}>Cadastro</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link active text-white' to={'/banco'}>Banco</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Jogo do Milhão
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <Link className='dropdown-item' to={'/perguntas'}>Perguntas</Link>
                                <li><a className="dropdown-item" href="#">Jogar</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
