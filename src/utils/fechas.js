const dos = (n) => String(n).padStart(2, '0')

export function hoyISO() {
  const d = new Date()
  return `${d.getFullYear()}-${dos(d.getMonth() + 1)}-${dos(d.getDate())}`
}

export function horaActual() {
  const d = new Date()
  return `${dos(d.getHours())}:${dos(d.getMinutes())}`
}

// "2026-10-15" -> "15/10/2026"
export function formatearFecha(iso) {
  const [anio, mes, dia] = iso.split('-')
  return `${dia}/${mes}/${anio}`
}

// "08:00 - 09:00" -> "08:00"
export function horaInicio(horario) {
  return horario.slice(0, 5)
}