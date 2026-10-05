import { useState } from 'react'
import rooms from '../data/rooms.json'
import RoomList from '../components/RoomList'
import ReservationModal from '../components/ReservationModal'

function Salas() {
  const [salaSeleccionada, setSalaSeleccionada] = useState(null)

  return (
    <div className="container mt-4">
      <h1 className="h3 fw-bold mb-4">Salas disponibles</h1>
      <RoomList
        rooms={rooms}
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