import { defineConfig } from 'vite'

export default defineConfig({
  base: '/docs',
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