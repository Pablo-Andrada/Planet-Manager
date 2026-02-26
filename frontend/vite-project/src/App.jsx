// src/App.jsx
// Componente principal: carga la lista desde el backend y conecta el formulario.
import React, { useEffect, useState } from 'react'
import { fetchPlanets, createPlanet, updatePlanet, deletePlanet } from './api'
import PlanetForm from './components/PlanetForm'
import PlanetList from './components/PlanetList'

export default function App() {
  const [planets, setPlanets] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editing, setEditing] = useState(null) // planeta que estamos editando (objeto) o null

  // cargar lista desde backend
  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchPlanets()
      setPlanets(data)
    } catch (err) {
      setError(err.message || 'Error loading planets')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  // crear
  const handleCreate = async (payload) => {
    await createPlanet(payload)
    await load() // recargar lista
  }

  // update
  const handleUpdate = async (payload) => {
    if (!editing) return
    await updatePlanet(editing.id, payload)
    setEditing(null)
    await load()
  }

  // delete
  const handleDelete = async (id) => {
    if (!confirm('Borrar planeta?')) return
    await deletePlanet(id)
    await load()
  }

  return (
    <div className="container">
      <h1>Planet Manager</h1>

      <div className="grid">
        <div>
          {/* Si editing tiene valor mostramos formulario en modo editar */}
          <PlanetForm
            key={editing ? editing.id : 'create'}
            initial={editing}
            onSave={editing ? handleUpdate : handleCreate}
            onCancel={() => setEditing(null)}
          />
        </div>

        <div>
          <h3>Lista de planetas</h3>
          {loading ? <div>Cargando...</div> : <PlanetList planets={planets} onEdit={setEditing} onDelete={handleDelete} />}
          {error && <div className="error">{error}</div>}
        </div>
      </div>
    </div>
  )
}