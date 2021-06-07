/*
 * @Description: eslint文件
 * @Autor: henry.xiukun
 * @Date: 2021-06-07 13:37:29
 * @LastEditors: henry.xiukun
 */
module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        //jest: true
    },
    plugins: ['prettier'],
    extends: [
        'plugin:vue/recommended',
        'plugin:vue/vue3-recommended',
        'plugin:prettier/recommended', //根据prettier配置格式化代码，解决eslint的冲突
        // 'plugin:vue/strongly-recommended',
        // 'eslint:recommended',
    ],
    parserOptions: {
        parser: 'babel-eslint',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            tsx: true,
        },
    },
    rules: {
        'vue/html-self-closing': 'off',
        'vue/html-closing-bracket-newline': 'off',
        'vue/no-v-html': 'off',
        'vue/html-indent': 'off',
        'prefer-destructuring': [
            'error',
            {
                // 优先使用数组和对象解构
                array: true,
                object: true,
            },
            {
                enforceForRenamedProperties: false,
            },
        ],
        'vue/no-multiple-template-root': 'off',
        'no-lonely-if': 'error', // 禁止 if 语句作为唯一语句出现在 else 语句块中
        'no-submodule-imports': ['off', '@'],
        'no-implicit-dependencies': ['off', ['@']],
        'no-unused-vars': 'off',
    },
};
