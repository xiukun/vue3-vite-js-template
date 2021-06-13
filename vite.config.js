/*
 * @Description:
 * @Autor: henry.xiukun
 * @Date: 2021-06-04 17:33:52
 * @LastEditors: henry.xiukun
 */
import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import styleImport from 'vite-plugin-style-import';
import vueJsx from '@vitejs/plugin-vue-jsx'; // 在单文件中使用 而不是.jsx
import legacy from '@vitejs/plugin-legacy';
import { viteMockServe } from 'vite-plugin-mock';

const stylePlugin = styleImport({
    libs: [
        {
            libraryName: 'element-plus',
            esModule: true,
            ensureStyleFile: true,
            resolveStyle: (name) => {
                name = name.slice(3);
                return `element-plus/packages/theme-chalk/src/${name}.scss`;
            },
            resolveComponent: (name) => {
                return `element-plus/lib/${name}`;
            },
        },
    ],
});
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        terserOptions: {
            compress: {
                drop_console: true, // 生产环境移除console  默认false
            },
        },
        outDir: 'dist', //指定输出路径
        assetsDir: 'assets', //指定生成静态资源的存放路径
    },
    plugins: [
        vue(),
        stylePlugin,
        vueJsx(),
        viteMockServe({ supportTs: false }), //supportTs: false 关闭ts
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
    ],
    resolve: {
        alias: {
            '~@': path.resolve(__dirname, 'src'),
            '@': path.resolve(__dirname, 'src'),
            '@com': path.resolve(__dirname, 'src/components'),
            '@api': path.resolve(__dirname, 'src/api'),
        },
    },
});
