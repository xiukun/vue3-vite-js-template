## 使用

----------------------------

- ### Vite构建
```
#npm 6.x
npm init @vitejs/app my-vue-app --template vue

# npm 7+, 需要额外的双横线：
npm init @vitejs/app my-vue-app -- --template vue

# yarn
yarn create @vitejs/app my-vue-app --template vue
```

- ### Vite插件
```
yarn add -D @vitejs/plugin-legacy   类似polyfill低版本兼容
yarn add -D @vitejs/plugin-vue-jsx  支持在vue页面中写jsx 
yarn add -D mockjs vite-plugin-mock  配置mock
yarn add vue-router@4  vuex@next axios dayjs 
yarn add element-plus normalize.css  
yarn add -D vite-plugin-style-import 按需引用element-plus


yarn add -D prettier 格式美化
yarn add -D babel-eslint eslint eslint-plugin-prettier eslint-config-prettier eslint-plugin-vue  校验

yarn add -D husky-init  husky   ## npx husky install 运行生成.husky文件夹
yarn add -D lint-staged 
```