import React, {Fragment, useState, useEffect} from 'react';
import Cita from './Components/Cita';
import Footer from './Components/Footer';
import Formulario from './Components/Formulario';

function App() {

  /**Citas en local Storage */
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }
  /**Arreglo de citas */
  const [citas, guardarCitas] = useState(citasIniciales);

  /**Use Effect para realizar ciertas operaciones cuando el state cambia */
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas))
    }else{
      localStorage.setItem('citas',JSON.stringify([]));
    }
  }, [citas, citasIniciales] );

  /**Funcion que tome las sitas actules y agregue una nueva */
  const crearCita = cita => {
    guardarCitas([
      ...citas,
      cita
    ])
  }

  /**Funcion que elimina una cita por su id */
  const eliminarCita = (id) =>{
    const nuevaCitas = citas.filter(cita => cita.id !== id);
    guardarCitas(nuevaCitas);
  }

  /**Mensaje condicional */
  const titulo = citas.length === 0? 'No hay citas' : 'Administra tus citas'
  return (
    <Fragment>
        <h1>Administrador de Pacientes</h1>

        <div className="container">
          <div className="row">
            <div className="one-half column">
              <Formulario
                crearCita={crearCita}
              />
            </div>
            <div className="one-half column">
              <h2>{titulo}</h2>
              {citas.map(cita => 
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              )}
            </div>
          </div>
        </div>

      <Footer/>
    </Fragment>
    
  );
}

export default App;
