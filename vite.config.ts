import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {//中转服务器
    open: true,
    port: 3000,
    proxy: {//代理实现跨域
      "/api": {
        target: "https://i5101b0918.oicp.vip/",//替换的服务端地址
        changeOrigin: true,//开启代理，允许跨域
        secure: false,  // 如果是https接口，需要配置这个参数
        rewrite: (path) => path.replace(/^\/api/, ""),//设置重写路径
      },
    },
  },
  define: {
    'process.env': {}
  }
})