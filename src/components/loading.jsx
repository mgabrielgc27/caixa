import React from 'react'

export default function loading() {
    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            fontSize: '30px',
            display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                flex: '1', 
        }}>
            <div style={{
                
            }}>
                <div className='text-center'>
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
                <div>
                    Carregando
                </div>
            </div>
        </div>
    )
}