import { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { useAuth } from '../context/AuthContext'
import { useReservas } from '../context/ReservasContext'
import horarios from '../data/horarios.json'
import { hoyISO, horaActual, horaInicio, formatearFecha } from '../utils/fechas'

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar({ nombre, correo, fecha, horario }) {
  const errores = {}
  if (nombre.trim().length < 3) errores.nombre = 'Ingresa tu nombre completo (mínimo 3 letras)'
  if (!REGEX_CORREO.test(correo.trim())) errores.correo = 'Ingresa un correo válido'
  if (!fecha) errores.fecha = 'Selecciona una fecha'
  else if (fecha < hoyISO()) errores.fecha = 'No puedes reservar en una fecha pasada'
  if (!horario) errores.horario = 'Selecciona un horario'
  return errores
}

function ReservationModal({ room, onCerrar }) {
  const { usuario } = useAuth()
  const { horarioOcupado, crearReserva } = useReservas()

  const [form, setForm] = useState({
    nombre: usuario.nombre,
    correo: usuario.correo,
    fecha: '',
    horario: '',
  })
  const [errores, setErrores] = useState({})

  useEffect(() => {
    const alTeclear = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [onCerrar])

  const handleChange = (e) => {
    const { name, value } = e.target
    // Al cambiar la fecha, el horario elegido puede dejar de ser válido
    setForm({ ...form, [name]: value, ...(name === 'fecha' ? { horario: '' } : {}) })
    setErrores({ ...errores, [name]: undefined })
  }

  // Un horario no se puede elegir si ya está reservado o si ya pasó (cuando la fecha es hoy)
  const estadoHorario = (h) => {
    if (!form.fecha) return null
    if (horarioOcupado(room.id, form.fecha, h)) return 'ocupado'
    if (form.fecha === hoyISO() && horaInicio(h) <= horaActual()) return 'pasado'
    return null
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const erroresForm = validar(form)
    setErrores(erroresForm)
    if (Object.keys(erroresForm).length > 0) return

    try {
      crearReserva({
        salaId: room.id,
        salaNombre: room.nombre,
        edificio: room.edificio,
        piso: room.piso,
        hapioResourceId: room.hapioResourceId,
        nombre: form.nombre.trim(),
        correo: form.correo.trim(),
        fecha: form.fecha,
        horario: form.horario,
      })
    } catch (err) {
      setErrores({ horario: err.message })
      return
    }

    onCerrar()
    Swal.fire({
      icon: 'success',
      title: '¡Reserva creada!',
      text: `${room.nombre} · ${formatearFecha(form.fecha)} · ${form.horario}`,
      confirmButtonColor: '#0E5A5A',
    })
  }

  return (
    <div className="modal-fondo" onClick={onCerrar}>
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-reserva"
        onClick={(e) => e.stopPropagation()}
      >
        <form className="modal-content modal-reserva" onSubmit={handleSubmit} noValidate>
          <div className="modal-header border-0">
            <h2 id="titulo-reserva" className="modal-title fs-5">Realizar reserva</h2>
            <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={onCerrar} />
          </div>

          <div className="modal-body">
            <p className="small opacity-75">Completa los siguientes campos para realizar la reserva</p>

            <label htmlFor="sala" className="form-label">Sala seleccionada</label>
            <input id="sala" className="form-control mb-3" value={room.nombre} readOnly />

            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
              id="nombre" name="nombre" className={'form-control' + (errores.nombre ? ' is-invalid' : '')}
              value={form.nombre} onChange={handleChange} placeholder="Nombre completo" readOnly />
            <div className="invalid-feedback">{errores.nombre}</div>

            <label htmlFor="correo-reserva" className="form-label mt-3">Correo electrónico</label>
            <input
              id="correo-reserva" name="correo" type="email" className={'form-control' + (errores.correo ? ' is-invalid' : '')}
              value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.edu"readOnly/>
            <div className="invalid-feedback">{errores.correo}</div>

            <div className="row g-3 mt-0">
              <div className="col-12 col-sm-6">
                <label htmlFor="fecha" className="form-label">Fecha</label>
                <input
                  id="fecha" name="fecha" type="date" min={hoyISO()}
                  className={'form-control' + (errores.fecha ? ' is-invalid' : '')}
                  value={form.fecha} onChange={handleChange}
                />
                <div className="invalid-feedback">{errores.fecha}</div>
              </div>
              <div className="col-12 col-sm-6">
                <label htmlFor="horario" className="form-label">Horario</label>
                <select
                  id="horario" name="horario" className={'form-select' + (errores.horario ? ' is-invalid' : '')}
                  value={form.horario} onChange={handleChange} disabled={!form.fecha}
                >
                  <option value="">{form.fecha ? 'Selecciona un horario' : 'Primero elige la fecha'}</option>
                  {horarios.map((h) => {
                    const estado = estadoHorario(h)
                    return (
                      <option key={h} value={h} disabled={estado !== null}>
                        {h}{estado === 'ocupado' ? ' (ocupado)' : estado === 'pasado' ? ' (ya pasó)' : ''}
                      </option>
                    )
                  })}
                </select>
                <div className="invalid-feedback">{errores.horario}</div>
              </div>
            </div>
          </div>

          <div className="modal-footer border-0">
            <button type="submit" className="btn btn-success w-100 fw-bold rounded-pill">Reservar</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReservationModal