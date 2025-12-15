import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
  ],
  // Use a relative base so the build works on GitHub Pages and Vercel
  // - For GitHub Pages (repo pages) an absolute base like '/repo-name/' also works,
  //   but using './' makes the build portable to hosting that serves at root (Vercel).
  base: './',
})