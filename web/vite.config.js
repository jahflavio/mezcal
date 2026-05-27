import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  base: '/mezcal/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        espadin: resolve(__dirname, 'espadin.html'),
        mexicanito: resolve(__dirname, 'mexicanito.html'),
        tobala: resolve(__dirname, 'tobala.html'),
        tepeztate: resolve(__dirname, 'tepeztate.html'),
        jabali: resolve(__dirname, 'jabali.html')
      }
    }
  }
})
