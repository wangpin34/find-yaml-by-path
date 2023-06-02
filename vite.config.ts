import preact from '@preact/preset-vite'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({command}) => {
  if (command === 'serve') {
    return {
      plugins: [preact()]
    }
  } else {
    return {
      base: '/find-yaml-by-path',
      plugins: [preact()]
    }
  }
})
