import React, {Fragment, useState} from 'react';
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

const Formulario = () => {

    //Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });

    const [error, actualizarError] = useState(false);

    //Funcion que se  ejecuta cada que el usuario escribe en los input
    const actualizarState = e => {
        actualizarCita({
            ...cita,
            [e.target.name] : e.target.value
        })
    }

    //Extraer los valores Destructuring
    const{ mascota, propietario, fecha, hora, sintomas } = cita;

    //Cuando el usuario envía el formulario
    const submitCita = (e) => {
        e.preventDefault();
        

        //Validar
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || sintomas.trim() === '') {
            actualizarError(true);
            Swal.fire({
				icon: "error",
				title: "Error",
				text: "Todos los campos son obligatorios!"
            });
            return;
        }
        actualizarError(false);

        //Asignar ID
        cita.id = uuidv4();
        console.log(cita);

        //Crear la cita

        //Reiniciar el form
        
    }

    return (
        <Fragment>

            <h2>Crear Cita</h2>

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea 
                    name="sintomas" 
                    cols="30" rows="10" 
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>

        </Fragment>
    );
}

export default Formulario;