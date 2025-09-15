import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/exam-practice-app/', // Set base path for GitHub Pages deployment
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add explicit extensions to resolve
  },
  server: {
    headers: {
      // Set proper MIME types for JSX files during development
      'Content-Type': 'application/javascript'
    }
  },
  build: {
    // Configure rollup options for production
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        // Ensure .jsx files are transformed correctly
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
})
