import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import { leerReservas, guardarReservas } from '../services/reservasStorage'

const ReservasContext = createContext(null)

export function ReservasProvider({ children }) {
  const { usuario } = useAuth()
  const [reservas, setReservas] = useState(leerReservas)

  useEffect(() => {
    guardarReservas(reservas)
  }, [reservas])

  const misReservas = usuario
    ? reservas
        .filter((r) => r.usuarioId === usuario.id)
        .sort((a, b) => (a.fecha + a.horario).localeCompare(b.fecha + b.horario))
    : []

  // Una sala no puede reservarse dos veces en la misma fecha y horario (por cualquier usuario)
  const horarioOcupado = (salaId, fecha, horario) =>
    reservas.some(
      (r) => r.salaId === salaId && r.fecha === fecha && r.horario === horario
    )

  const crearReserva = (datos) => {
    if (horarioOcupado(datos.salaId, datos.fecha, datos.horario)) {
      throw new Error('Ese horario ya está reservado para esta sala')
    }
    const nueva = {
      ...datos,
      id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      usuarioId: usuario.id,
      creadaEn: new Date().toISOString(),
    }
    setReservas((anteriores) => [...anteriores, nueva])
    return nueva
  }

  const cancelarReserva = (id) => {
    setReservas((anteriores) => anteriores.filter((r) => r.id !== id))
  }

  const cancelarTodas = () => {
    setReservas((anteriores) => anteriores.filter((r) => r.usuarioId !== usuario.id))
  }

  return (
    <ReservasContext.Provider
      value={{ misReservas, horarioOcupado, crearReserva, cancelarReserva, cancelarTodas }}
    >
      {children}
    </ReservasContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useReservas() {
  return useContext(ReservasContext)
}