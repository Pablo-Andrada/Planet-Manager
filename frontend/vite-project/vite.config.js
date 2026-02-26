// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react({
//       babel: {
//         plugins: [['babel-plugin-react-compiler']],
//       },
//     }),
//   ],
// })
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Proxy simple: redirige /planets a http://localhost:4000
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Todas las requests que comiencen con /planets irán al backend
      '/planets': {
        target: 'http://localhost:4000',
        changeOrigin: true,
        secure: false
      }
    }
  }
})