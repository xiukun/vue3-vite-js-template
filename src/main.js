/*
 * @Description:
 * @Autor: henry.xiukun
 * @Date: 2021-06-04 17:33:52
 * @LastEditors: henry.xiukun
 */
import { createApp } from 'vue';
import installElementPlus from './plugins/element';
import '@mock/index';
import App from './App.vue';

const app = createApp(App);
installElementPlus(app);
app.mount('#app');
