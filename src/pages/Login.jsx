import { useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const REGEX_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validar({ correo, clave }) {
  const errores = {}
  if (!correo.trim()) errores.correo = 'Ingresa tu correo'
  else if (!REGEX_CORREO.test(correo.trim())) errores.correo = 'El correo no es válido'
  if (!clave) errores.clave = 'Ingresa tu clave'
  return errores
}

function Login() {
  const { usuario, login } = useAuth()
  const navigate = useNavigate()
  const ubicacion = useLocation()

  const [form, setForm] = useState({ correo: '', clave: '' })
  const [errores, setErrores] = useState({})
  const [errorLogin, setErrorLogin] = useState('')
  const [cargando, setCargando] = useState(false)
  const [verClave, setVerClave] = useState(false)

  if (usuario) return <Navigate to="/salas" replace />

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    setErrorLogin('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresForm = validar(form)
    setErrores(erroresForm)
    if (Object.keys(erroresForm).length > 0) return

    setCargando(true)
    try {
      await login(form.correo, form.clave)
      navigate(ubicacion.state?.desde?.pathname ?? '/salas', { replace: true })
    } catch (err) {
      setErrorLogin(err.message)
      setCargando(false)
    }
  }

  return (
    <div className="login-pagina">
      <div className="login-banda login-banda-superior">
        <h1>Reserva de Espacios</h1>
        <p>Salas, laboratorios y auditorios de la universidad</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <h2 className="login-titulo">Ingresar</h2>

        <div className="mb-3">
          <label htmlFor="correo" className="form-label">Correo</label>
          <input
            id="correo"
            name="correo"
            type="email"
            autoComplete="username"
            className={'form-control' + (errores.correo ? ' is-invalid' : '')}
            value={form.correo}
            onChange={handleChange}
            placeholder="correo@unab.cl"
          />
          {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="clave" className="form-label">Clave</label>
          <div className="input-group has-validation">
            <input
              id="clave"
              name="clave"
              type={verClave ? 'text' : 'password'}
              autoComplete="current-password"
              className={'form-control' + (errores.clave ? ' is-invalid' : '')}
              value={form.clave}
              onChange={handleChange}
            />
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setVerClave(!verClave)}
            >
              {verClave ? 'Ocultar' : 'Ver'}
            </button>
            {errores.clave && <div className="invalid-feedback">{errores.clave}</div>}
          </div>
        </div>

        {errorLogin && (
          <div className="alert alert-danger py-2" role="alert">{errorLogin}</div>
        )}

        <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
          {cargando ? 'Verificando...' : 'Ingresar'}
        </button>
      </form>

      <div className="login-banda login-banda-inferior" />
    </div>
  )
}

export default Login