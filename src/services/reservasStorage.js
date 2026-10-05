const CLAVE_RESERVAS = 'reservas'

export function leerReservas() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE_RESERVAS)) ?? []
  } catch {
    return []
  }
}

export function guardarReservas(reservas) {
  localStorage.setItem(CLAVE_RESERVAS, JSON.stringify(reservas))
}