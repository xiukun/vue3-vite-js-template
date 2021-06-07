<!--
 * @Description: 
 * @Autor: henry.xiukun
 * @Date: 2021-06-04 17:33:52
 * @LastEditors: henry.xiukun
-->
<template>
    <h1>{{ msg }}</h1>

    <p>
        <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Documentation </a>
        |
        <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
    </p>

    <button @click="state.count++"> count is: {{ state.count }} </button>
    <p>
        Edit
        <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
    <p>
        <el-button @click="getApi"> click -- getApi请求 </el-button>
    </p>
</template>

<script setup>
import { defineProps, reactive } from 'vue';

defineProps({
    msg: String,
});

const state = reactive({ count: 0 });

const getApi = () => {
    fetch('/api/getUsers')
        .then((res) => res.json())
        .then((data) => console.log(data));
};
</script>

<style scoped>
a {
    color: #42b983;
}
</style>
