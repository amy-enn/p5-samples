// vite.config.js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        ports: path.resolve(__dirname, 'ports.html'),
        lighthouse: path.resolve(__dirname, 'lighthouse.html'),
        examples: path.resolve(__dirname, 'examples.html'),
      }
    }
  }
});
