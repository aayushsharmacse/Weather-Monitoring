import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // server:{
  //   proxy:{
  //     '/api':'https://fluffy-fiesta-gg7xwq99x47hv5gv-4000.app.github.dev/',
  //   }
  // },
  plugins: [react()],
})
