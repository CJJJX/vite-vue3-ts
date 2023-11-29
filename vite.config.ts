
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 设置代理，解决跨域
  server: {
     port: 5173,
     host: '0.0.0',
    open: true,
    proxy:{
      '/api': "https://imooc.zcwytd.com"
    },
    cors: true,
  },
  resolve:{
    alias:{
      '@': path.resolve(__dirname, './src')
    }
  }
})
