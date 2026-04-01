// src/api/httpClient.js

const API_BASE_URL = import.meta.env.VITE_API_URL || ''

const request = async (path, options = {}) => {
  const { method = 'GET', body, headers = {} } = options

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  })

  // Intentamos leer JSON si el backend respondió JSON.
  // Si no hay JSON, no rompemos la app por eso.
  let data = null
  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    data = await response.json().catch(() => null)
  }

  if (!response.ok) {
    throw new Error(
      data?.error || data?.message || `Request failed with status ${response.status}`
    )
  }

  return data
}

export const httpClient = {
  get: (path) => request(path, { method: 'GET' }),
  post: (path, body) => request(path, { method: 'POST', body }),
  put: (path, body) => request(path, { method: 'PUT', body }),
  patch: (path, body) => request(path, { method: 'PATCH', body }),
  delete: (path) => request(path, { method: 'DELETE' }),
}