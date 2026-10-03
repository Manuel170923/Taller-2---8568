import rooms from '../data/rooms.json'
import RoomList from '../components/RoomList'

function Salas() {
  return (
    <div className="container mt-4">
      <h1 className="h3 fw-bold mb-4">Salas disponibles</h1>
      <RoomList
        rooms={rooms}
        onReservar={(room) => console.log('Reservar:', room.nombre)}
      />
    </div>
  )
}

export default Salas