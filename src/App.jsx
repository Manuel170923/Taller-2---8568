import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import RutaProtegida from './components/RutaProtegida'
import Login from './pages/Login'
import Salas from './pages/Salas'
import MisReservas from './pages/MisReservas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<RutaProtegida><Layout /></RutaProtegida>}>
          <Route path="/salas" element={<Salas />} />
          <Route path="/mis-reservas" element={<MisReservas />} />
        </Route>

        <Route path="*" element={<Navigate to="/salas" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App