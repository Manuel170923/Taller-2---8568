import { useMemo, useState } from 'react'
import rooms from '../data/rooms.json'
import RoomList from '../components/RoomList'
import FiltroSalas from '../components/FiltroSalas'
import ReservationModal from '../components/ReservationModal'

// Quita tildes y pasa a minúsculas: "Computación" -> "computacion"
const normalizar = (texto) =>
  texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

// Opciones de los selects, tomadas de rooms.json
const tipos = [...new Set(rooms.map((r) => r.tipo))].sort((a, b) =>
  a.localeCompare(b, 'es')
)
const edificios = [...new Set(rooms.map((r) => r.edificio))].sort((a, b) =>
  a.localeCompare(b, 'es')
)

function Salas() {
  const [salaSeleccionada, setSalaSeleccionada] = useState(null)
  const [tipo, setTipo] = useState('')
  const [edificio, setEdificio] = useState('')
  const [busqueda, setBusqueda] = useState('')

  const roomsFiltradas = useMemo(() => {
    const texto = normalizar(busqueda.trim())

    return rooms.filter(
      (room) =>
        (tipo === '' || room.tipo === tipo) &&
        (edificio === '' || room.edificio === edificio) &&
        normalizar(room.descripcion).includes(texto)
    )
  }, [tipo, edificio, busqueda])

  const hayFiltros = tipo !== '' || edificio !== '' || busqueda.trim() !== ''

  const limpiarFiltros = () => {
    setTipo('')
    setEdificio('')
    setBusqueda('')
  }

  return (
    <div className="container mt-4">
      <h1 className="h3 fw-bold mb-4">Salas disponibles</h1>

      <FiltroSalas
        tipos={tipos}
        edificios={edificios}
        tipo={tipo}
        onTipo={setTipo}
        edificio={edificio}
        onEdificio={setEdificio}
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        hayFiltros={hayFiltros}
        onLimpiar={limpiarFiltros}
      />

      <RoomList
        rooms={roomsFiltradas}
        onReservar={setSalaSeleccionada}
      />

      {salaSeleccionada && (
        <ReservationModal
          key={salaSeleccionada.id}
          room={salaSeleccionada}
          onCerrar={() => setSalaSeleccionada(null)}
        />
      )}
    </div>
  )
}

export default Salas