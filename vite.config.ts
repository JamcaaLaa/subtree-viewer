import { defineConfig } from 'vite'

export default defineConfig({
  base: '/subtree-viewer',
  build: {
    sourcemap: true,
    emptyOutDir: true,
    outDir: './docs'
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})