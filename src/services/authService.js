import bcrypt from 'bcryptjs'
import usuarios from '../data/usuarios.json'

const CLAVE_SESION = 'sesionUsuario'

export async function iniciarSesion(correo, clave) {
  const usuario = usuarios.find(
    (u) => u.correo.toLowerCase() === correo.trim().toLowerCase()
  )

  const claveCorrecta = usuario
    ? await bcrypt.compare(clave, usuario.claveHash)
    : false

  if (!claveCorrecta) {
    throw new Error('Correo o clave incorrectos')
  }

  const sesion = { id: usuario.id, nombre: usuario.nombre, correo: usuario.correo }
  sessionStorage.setItem(CLAVE_SESION, JSON.stringify(sesion))
  return sesion
}

export function obtenerSesion() {
  try {
    return JSON.parse(sessionStorage.getItem(CLAVE_SESION))
  } catch {
    return null
  }
}

export function cerrarSesion() {
  sessionStorage.removeItem(CLAVE_SESION)
}