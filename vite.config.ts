import { defineConfig } from 'vite'

export default defineConfig({
  base: '/subtree-viewer/',
  build: {
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
})