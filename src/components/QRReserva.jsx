import Swal from 'sweetalert2'

const API_QR = 'https://api.qrserver.com/v1/create-qr-code/'

const constructQR = (reserva) =>
  [
    `RESERVA:${reserva.id}`,
    reserva.salaNombre,
    reserva.fecha,
    reserva.horario,
    reserva.nombre,
  ].join('|')

const urlQR = (reserva, size) =>
  `${API_QR}?size=${size}x${size}&margin=10&format=png&data=${encodeURIComponent(
    constructQR(reserva)
  )}`

function QRReserva({ reserva }) {
  const nombreArchivo = `qr-reserva-${reserva.id}.png`

  const descargar = async (url) => {
    try {
      const respuesta = await fetch(url)
      const blob = await respuesta.blob()
      const enlace = document.createElement('a')
      enlace.href = URL.createObjectURL(blob)
      enlace.download = nombreArchivo
      document.body.appendChild(enlace)
      enlace.click()
      enlace.remove()
      URL.revokeObjectURL(enlace.href)
    } catch {
      window.open(url, '_blank', 'noopener')
    }
  }

  const abrirPopup = async () => {
    const urlGrande = urlQR(reserva, 300)

    const { isConfirmed } = await Swal.fire({
      title: 'QR de tu reserva',
      text: `${reserva.salaNombre} · ${reserva.horario}`,
      imageUrl: urlGrande,
      imageWidth: 250,
      imageHeight: 250,
      imageAlt: `Código QR de la reserva ${reserva.id}`,
      showCancelButton: true,
      confirmButtonText: 'Descargar QR',
      cancelButtonText: 'Cerrar',
    })

    if (isConfirmed) descargar(urlGrande)
  }

  return (
    <button
      type="button"
      className="reserva-qr"
      onClick={abrirPopup}
      title="Ver y descargar QR"
      aria-label={`Ver QR de la reserva en ${reserva.salaNombre}`}
    >
      <img
        src={urlQR(reserva, 100)}
        alt=""
        width="80"
        height="80"
        loading="lazy"
      />
    </button>
  )
}

export default QRReserva
