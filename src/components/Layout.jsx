import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Layout() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <footer className="bg-dark text-white text-center py-3">
        <p className="mb-0 small">&copy; 2026 Sistema de Reserva de Espacios Universitarios</p>
      </footer>
    </div>
  )
}

export default Layout