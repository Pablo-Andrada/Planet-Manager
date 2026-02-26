// src/components/PlanetList.jsx
import React from 'react'

export default function PlanetList({ planets, onEdit, onDelete }) {
  if (!planets || planets.length === 0) {
    return <div>No hay planetas aún.</div>
  }

  return (
    <ul className="list">
      {planets.map(p => (
        <li key={p.id} className="card list-item">
          <div>
            <div className="title">{p.name}</div>
            <div className="muted">Diámetro: {p.diameter} km</div>
            <div className="muted">Vida: {p.hasLife ? 'Sí' : 'No'}</div>
          </div>

          <div className="actions">
            <button onClick={() => onEdit(p)}>Editar</button>
            <button onClick={() => onDelete(p.id)}>Borrar</button>
          </div>
        </li>
      ))}
    </ul>
  )
}