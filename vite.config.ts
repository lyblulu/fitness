import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
// github-pages 模式下部署到 https://<user>.github.io/fitness/ 子路径,其余环境保持根路径
export default defineConfig(({ mode }) => ({
  base: mode === 'github-pages' ? '/fitness/' : '/',
  server: {
    allowedHosts: ['.trycloudflare.com'],
  },
  build: {
    sourcemap: 'hidden',
  },
  plugins: [
    react({
      babel: {
        plugins: [
          'react-dev-locator',
        ],
      },
    }),
    tsconfigPaths()
  ],
}))
