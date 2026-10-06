function FiltroSalas({
  tipos,
  edificios,
  tipo,
  onTipo,
  edificio,
  onEdificio,
  busqueda,
  onBusqueda,
  hayFiltros,
  onLimpiar,
}) {
  return (
    <div className="filtros-panel bg-white border rounded-4 shadow-sm p-3 p-md-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="h6 fw-bold mb-0">Filtros</h2>
        {hayFiltros && (
          <button
            type="button"
            className="btn btn-link btn-sm p-0"
            onClick={onLimpiar}
          >
            Limpiar filtros
          </button>
        )}
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-4">
          <label htmlFor="filtro-tipo" className="form-label small mb-1">
            Tipo de sala
          </label>
          <select
            id="filtro-tipo"
            className="form-select"
            value={tipo}
            onChange={(e) => onTipo(e.target.value)}
          >
            <option value="">Todos los tipos</option>
            {tipos.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="filtro-edificio" className="form-label small mb-1">
            Edificio
          </label>
          <select
            id="filtro-edificio"
            className="form-select"
            value={edificio}
            onChange={(e) => onEdificio(e.target.value)}
          >
            <option value="">Todos los edificios</option>
            {edificios.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="buscar-sala" className="form-label small mb-1">
            Buscar
          </label>
          <input
            id="buscar-sala"
            type="search"
            className="form-control"
            placeholder="Buscar en la descripción (ej: proyector)"
            value={busqueda}
            onChange={(e) => onBusqueda(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

export default FiltroSalas