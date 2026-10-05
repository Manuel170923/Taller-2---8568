import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function RutaProtegida({ children }) {
  const { usuario } = useAuth()
  const ubicacion = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: ubicacion }} />
  }
  return children
}

export default RutaProtegida