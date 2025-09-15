import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/exam-practice-app/', // Set base path for GitHub Pages deployment
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'], // Add explicit extensions to resolve
    alias: {
      // Add alias to ensure imports resolve correctly
      'src': '/src'
    }
  },
  build: {
    // Ensure source maps are generated
    sourcemap: true,
    // Ensure assets are properly processed
    assetsDir: 'assets',
    // Configure rollup options for production
    rollupOptions: {
      input: {
        main: './index.html',
      },
      output: {
        // Ensure .jsx files are transformed correctly
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
})
