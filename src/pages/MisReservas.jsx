import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { useReservas } from '../context/ReservasContext'
import { formatearFecha } from '../utils/fechas'
import QRReserva from '../components/QRReserva'

function MisReservas() {
  const { misReservas, cancelarReserva, cancelarTodas } = useReservas()

  const confirmar = (titulo, texto) =>
    Swal.fire({
      title: titulo,
      text: texto,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'Volver',
      confirmButtonColor: '#C0392B',
    })

  const handleCancelar = async (reserva) => {
    const { isConfirmed } = await confirmar(
      '¿Cancelar reserva?',
      `${reserva.salaNombre} · ${formatearFecha(reserva.fecha)} · ${reserva.horario}`
    )
    if (isConfirmed) {
      cancelarReserva(reserva.id)
      Swal.fire({ icon: 'info', title: 'Reserva cancelada', timer: 1500, showConfirmButton: false })
    }
  }

  const handleCancelarTodas = async () => {
    const { isConfirmed } = await confirmar(
      '¿Cancelar todas tus reservas?',
      `Se eliminarán ${misReservas.length} reservas.`
    )
    if (isConfirmed) cancelarTodas()
  }

  return (
    <div className="container mt-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
        <h1 className="h3 fw-bold mb-0">Mis reservas</h1>
        {misReservas.length > 1 && (
          <button className="btn btn-outline-danger btn-sm" onClick={handleCancelarTodas}>
            Cancelar todas
          </button>
        )}
      </div>

      {misReservas.length === 0 ? (
        <div className="vacio">
          <p className="mb-3">Aún no tienes reservas.</p>
          <Link to="/salas" className="btn btn-primary">Ver salas disponibles</Link>
        </div>
      ) : (
        <ul className="lista-reservas">
          {misReservas.map((r) => (
            <li key={r.id} className="reserva-item">
              <div className="reserva-sala">
                <h2>{r.salaNombre}</h2>
                <span>{r.edificio} · Piso {r.piso}</span>
                <span>A nombre de {r.nombre}</span>
              </div>
              <QRReserva reserva={r} />
              <div className="reserva-dato">
                <small>Fecha</small>
                <strong>{formatearFecha(r.fecha)}</strong>
              </div>
              <div className="reserva-dato">
                <small>Horario</small>
                <strong>{r.horario}</strong>
              </div>
              <button className="btn btn-cancelar" onClick={() => handleCancelar(r)}>
                Cancelar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MisReservas