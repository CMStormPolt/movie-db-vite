import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "components": '/src/components',
      "pages": '/src/pages',
      "routes": '/src/routes',
      "types": '/src/types',
      "apollo": '/src/apollo',
      "utils": '/src/utils',
      "api": '/src/api'
    },
  },

})
