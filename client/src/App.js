import './App.css';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import ImagenHeader from './components/Plantilla/ImagenHeader';
import { isLogin } from './utils/JWT';
import TablaRestaurantes from './components/Tablas/TablaRestaurantes';

export default function App() {

  return (
    <>
      <ImagenHeader />
      
      <div className='cuerpo'>        

        {isLogin() ? 
          <>
            <Button variant="primary" href='./crear'>Crear</Button>
            <div className='espacio'></div>
            <TablaRestaurantes />
          </>
        : 
          <div>
            <h2>Inicia sesión</h2>
            <p>Inicia sesión para disfrutar de toda una experiencia gastronómica.</p>
            <Button variant="primary" href='/login'>Iniciar sesión</Button>
            
            <img className="imagen espacio" src='/assets/img/comida.jpg' alt='Comida en la mesa' />
          </div>
        }

      </div>
    </>
  )
}