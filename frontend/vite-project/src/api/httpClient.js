// src/api/httpClient.js

// URL base del backend.
// Si en el futuro definís VITE_API_URL en tu .env, se usará esa URL.
// Si no existe, queda vacío y las rutas serán relativas.
const API_BASE_URL = import.meta.env.VITE_API_URL || ''

/**
 * Función genérica para hacer requests al backend.
 * Recibe:
 * - path: la ruta del endpoint, por ejemplo "/planets"
 * - options: configuración extra como method, body o headers
 */
const request = async (path, options = {}) => {
  // Desestructuramos opciones con valores por defecto
  const { method = 'GET', body, headers = {} } = options

  // Hacemos la petición con fetch
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      // Le decimos al backend que enviamos JSON
      'Content-Type': 'application/json',
      // Permitimos agregar headers extra si hacen falta
      ...headers,
    },
    // Si body existe, lo convertimos a JSON
    // Si no existe, mandamos undefined
    body: body ? JSON.stringify(body) : undefined,
  })

  // Vamos a intentar leer la respuesta como JSON
  // Si el backend no devolvió JSON, no queremos romper la app
  let data = null
  const contentType = response.headers.get('content-type') || ''

  // Solo intentamos parsear JSON si realmente viene como application/json
  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null)
  }

  // Si la respuesta no fue exitosa, lanzamos un error
  if (!response.ok) {
    throw new Error(
      data?.error ||
        data?.message ||
        `Request failed with status ${response.status}`
    )
  }

  // Si todo salió bien, devolvemos los datos
  return data
}

// Objeto que agrupa los métodos más comunes de HTTP
export const httpClient = {
  // GET: obtener datos
  get: (path) => request(path, { method: 'GET' }),

  // POST: crear datos
  post: (path, body) => request(path, { method: 'POST', body }),

  // PUT: reemplazar/actualizar datos
  put: (path, body) => request(path, { method: 'PUT', body }),

  // PATCH: actualizar parcialmente datos
  patch: (path, body) => request(path, { method: 'PATCH', body }),

  // DELETE: eliminar datos
  delete: (path) => request(path, { method: 'DELETE' }),
}