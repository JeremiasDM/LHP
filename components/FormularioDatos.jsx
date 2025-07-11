import React, { useState } from 'react';
import './Formulario.css';

const estiloInput = {
  width: '100%',
  padding: '10px',
  borderRadius: '5px',
  border: '1px solid #ccc',
  backgroundColor: '#0B0E19',
  color: '#FFFFFF'
};

const estiloBoton = {
  padding: '10px 20px',
  margin: '5px',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const FormularioDatos = ({ datos, setDatos, setFase, handleCancelar, jugadores }) => {
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'nombre' || name === 'apellido') {
      if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ\s]*$/.test(value)) return;
    }
    if (name === 'dni' || name === 'telefono') {
      if (!/^\d*$/.test(value)) return;
    }

    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: '' });
  };

  const today = new Date().toISOString().split('T')[0];

const validarFase1 = () => {
  const nuevosErrores = {};
  const listaJugadores = jugadores || []; 

  if (!datos.nombre) nuevosErrores.nombre = 'Falta completar este campo';
  if (!datos.apellido) nuevosErrores.apellido = 'Falta completar este campo';
  if (!datos.dni) {
    nuevosErrores.dni = 'Falta completar este campo';
  } else if (datos.dni.length < 7) {
    nuevosErrores.dni = 'El DNI debe tener al menos 7 números';
  } else if (listaJugadores.some(j => j.dni === datos.dni)) {
    nuevosErrores.dni = 'El DNI ya está registrado';
  }

    if (!datos.domicilio) nuevosErrores.domicilio = 'Falta completar este campo';
    if (!datos.telefono) {
      nuevosErrores.telefono = 'Falta completar este campo';
    } else if (datos.telefono.length < 7) {
      nuevosErrores.telefono = 'El teléfono debe tener al menos 7 números';
    }
    if (!datos.genero) nuevosErrores.genero = 'Falta completar este campo';
    if (!datos.localidad) nuevosErrores.localidad = 'Falta completar este campo';
    if (!datos.club) nuevosErrores.club = 'Falta completar este campo';
    if (!datos.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'Falta completar este campo';
    } else if (datos.fechaNacimiento > today) {
      nuevosErrores.fechaNacimiento = 'La fecha no puede ser futura';
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSiguiente = () => {
    if (validarFase1()) {
      setFase(2);
    }
  };

  return (
    <div className="contenedor-principal">
      <h2>Registro de Jugador</h2>

      {[
        { label: 'Nombre*', name: 'nombre', type: 'text' },
        { label: 'Apellido*', name: 'apellido', type: 'text' },
        { label: 'DNI*', name: 'dni', type: 'text' },
        { label: 'Domicilio*', name: 'domicilio', type: 'text' },
        { label: 'Teléfono*', name: 'telefono', type: 'text' },
        { label: 'Fecha de Nacimiento*', name: 'fechaNacimiento', type: 'date', max: today }
      ].map(({ label, name, type, max }) => (
        <div key={name} className="form-group">
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            type={type}
            name={name}
            value={datos[name] || ''}
            onChange={handleChange}
            style={estiloInput}
            max={max}
          />
          <div className="error-message">{errores[name]}</div>
        </div>
      ))}

      <div className="form-group">
        <label htmlFor="genero">Género*</label>
        <select id="genero" name="genero" value={datos.genero} onChange={handleChange} style={estiloInput}>
          <option value="" disabled>Seleccione un género</option>
          <option value="Masculino">Masculino</option>
          <option value="Femenino">Femenino</option>
        </select>
        <div className="error-message">{errores.genero}</div>
      </div>

      <div className="form-group">
        <label htmlFor="localidad">Localidad*</label>
        <select id="localidad" name="localidad" value={datos.localidad} onChange={handleChange} style={estiloInput}>
          <option value="" disabled>Seleccione una localidad</option>
          <option value="Localidad 1">Localidad 1</option>
          <option value="Localidad 2">Localidad 2</option>
          <option value="Localidad 3">Localidad 3</option>
        </select>
        <div className="error-message">{errores.localidad}</div>
      </div>

      <div className="form-group">
        <label htmlFor="club">Club*</label>
        <select id="club" name="club" value={datos.club} onChange={handleChange} style={estiloInput}>
          <option value="" disabled>Seleccione un club</option>
          <option value="Club A">Club A</option>
          <option value="Club B">Club B</option>
          <option value="Club C">Club C</option>
        </select>
        <div className="error-message">{errores.club}</div>
      </div>

      <button onClick={handleSiguiente} style={{ ...estiloBoton, backgroundColor: 'green', color: '#FFFFFF' }}>
        Siguiente
      </button>
      <button onClick={handleCancelar} style={{ ...estiloBoton, backgroundColor: 'red', color: '#FFFFFF' }}>
        Cancelar
      </button>
    </div>
  );
};

export default FormularioDatos;
