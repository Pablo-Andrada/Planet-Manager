// src/api/planets.js

// Importamos el cliente HTTP genérico
import { httpClient } from './httpClient'

// Ruta base de este recurso
const BASE_PATH = '/planets'

/**
 * Trae todos los planetas
 */
export const fetchPlanets = () => {
  return httpClient.get(BASE_PATH)
}

/**
 * Crea un nuevo planeta
 * payload = datos del planeta que llegan desde el formulario
 */
export const createPlanet = (payload) => {
  return httpClient.post(BASE_PATH, payload)
}

/**
 * Actualiza un planeta existente
 * id = identificador del planeta
 * payload = nuevos datos
 */
export const updatePlanet = (id, payload) => {
  return httpClient.put(`${BASE_PATH}/${id}`, payload)
}

/**
 * Elimina un planeta por id
 */
export const deletePlanet = (id) => {
  return httpClient.delete(`${BASE_PATH}/${id}`)
}