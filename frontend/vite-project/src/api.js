// src/api.js
// Centralizamos las llamadas fetch para no repetir URLs en la UI.
// Usamos rutas relativas (Vite proxy enviará a http://localhost:4000)

const base = '/planets' // Vite proxy redirige esto al backend

// obtener todos los planetas
export async function fetchPlanets() {
  const res = await fetch(base)
  if (!res.ok) throw new Error('Failed to fetch planets')
  return res.json()
}

// crear planeta
export async function createPlanet(payload) {
  const res = await fetch(base, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    // leer mensaje de error si lo envía el backend
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to create planet')
  }
  return res.json()
}

// actualizar planeta
export async function updatePlanet(id, payload) {
  const res = await fetch(`${base}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to update planet')
  }
  return res.json()
}

// borrar planeta
export async function deletePlanet(id) {
  const res = await fetch(`${base}/${id}`, { method: 'DELETE' })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err.error || 'Failed to delete planet')
  }
  return res.json()
}