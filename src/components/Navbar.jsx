import { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const [abierto, setAbierto] = useState(false)

  const cerrarMenu = () => setAbierto(false)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">Reserva de Espacios</span>

        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-expanded={abierto}
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse justify-content-end ${abierto ? 'show' : ''}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/salas" className="nav-link" onClick={cerrarMenu}>
                Salas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/mis-reservas" className="nav-link" onClick={cerrarMenu}>
                Mis reservas
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar