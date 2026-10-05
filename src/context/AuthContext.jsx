import { createContext, useContext, useState } from 'react'
import { iniciarSesion, obtenerSesion, cerrarSesion } from '../services/authService'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(obtenerSesion)

  const login = async (correo, clave) => {
    const sesion = await iniciarSesion(correo, clave)
    setUsuario(sesion)
    return sesion
  }

  const logout = () => {
    cerrarSesion()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
  return useContext(AuthContext)
}