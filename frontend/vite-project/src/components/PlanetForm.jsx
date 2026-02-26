// src/components/PlanetForm.jsx
import React, { useState, useEffect } from 'react'

// Reutilizable: si recibe `initial` funciona como edit; si no, como create.
// onSave debe ser una función async que reciba el objeto {name, diameter, hasLife}
export default function PlanetForm({ initial = null, onSave, onCancel }) {
  // form state
  const [name, setName] = useState('')
  const [diameter, setDiameter] = useState('')
  const [hasLife, setHasLife] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  // Si viene initial (edición), precargamos los valores
  useEffect(() => {
    if (initial) {
      setName(initial.name || '')
      setDiameter(initial.diameter ?? '')
      setHasLife(Boolean(initial.hasLife))
    } else {
      // limpiar si no hay initial
      setName('')
      setDiameter('')
      setHasLife(false)
    }
    setError(null)
  }, [initial])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    // validaciones mínimas
    if (!name.trim()) return setError('Name is required')
    if (!diameter || Number.isNaN(Number(diameter))) return setError('Diameter must be a number')

    const payload = {
      name: name.trim(),
      diameter: Number(diameter),
      hasLife
    }

    try {
      setSaving(true)
      await onSave(payload) // onSave viene del padre y hace la llamada a la API
    } catch (err) {
      setError(err.message || 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card form">
      <h3>{initial ? 'Editar planeta' : 'Crear planeta'}</h3>

      {error && <div className="error">{error}</div>}

      <label>
        Nombre
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Earth" />
      </label>

      <label>
        Diámetro (km)
        <input value={diameter} onChange={e => setDiameter(e.target.value)} placeholder="12742" />
      </label>

      <label className="row">
        <input type="checkbox" checked={hasLife} onChange={e => setHasLife(e.target.checked)} />
        <span>Tiene vida</span>
      </label>

      <div className="row buttons">
        <button type="submit" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
        {onCancel && <button type="button" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  )
}