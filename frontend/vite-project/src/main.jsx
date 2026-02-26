// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
// src/main.jsx
// Punto de entrada React: monta <App /> en #root
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css' // estilos simples

const container = document.getElementById('root')
createRoot(container).render(<App />)