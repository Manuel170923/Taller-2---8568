import RoomCard from './RoomCard'

function RoomList({ rooms, disponibilidad = {}, onReservar }) {
  const estaDisponible = (room) => disponibilidad[room.id] !== false

  const cantidadDisponibles = rooms.filter(estaDisponible).length

  if (rooms.length === 0) {
    return (
      <div className="alert alert-warning text-center">
        No se encontraron espacios con los filtros seleccionados.
      </div>
    )
  }

  return (
    <>
      <p className="text-muted mb-3">
        Cantidad disponible: {cantidadDisponibles}
      </p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {rooms.map((room) => (
          <div className="col" key={room.id}>
            <RoomCard
              room={room}
              disponible={estaDisponible(room)}
              onReservar={onReservar}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default RoomList