import React, {Fragment, useState, useEffect} from 'react';
import Swal from "sweetalert2";
import Formulario from "./components/Formulario";
import Cita from "./components/Cita";

function App() {

  //Citas en local Storage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if (!citasIniciales) {
    citasIniciales = [];
  }

  //Arreglo de Citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //Use Effect para realizar ciertas operaciones cuando el state cambia
  useEffect(() => {
    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas));
    } else {
      localStorage.setItem('citas', JSON.stringify([]));
    }
  }, [citas]);

  //Función para tomar las citas actuales y agrear la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }

  //Función que elimina una cita por su ID
  const eliminarCita = id => {
    Swal.fire({
			title: "Estás seguro?",
			text: "Esta acción no se puede deshacer!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, borralo!",
			cancelButtonText: "Cancelar",
		}).then((result) => {
			if (result.value) {
        Swal.fire("Borrado!", "Tu cita fue borrada con éxito.", "success");
        const nuevasCitas = citas.filter((cita) => cita.id !== id);
				guardarCitas(nuevasCitas);
			}
		});   
  }

  //Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

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
            {citas.map(cita => (
              <Cita 
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
