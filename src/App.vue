<!--
 * @Description: 入口App.vue
 * @Autor: henry.xiukun
 * @Date: 2021-06-04 17:33:52
 * @LastEditors: henry.xiukun
-->
<template>
    <img alt="Vue logo" src="./assets/logo.png" />
    <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
    <com-search ref="formSearchRef" :rules="rules" :props="searchConfig" :form="filterForm" :label-width="searchConfig.labelWidth" :inline="true">
        <template #search>
            <el-button type="primary" icon="el-icon-search" @click.stop.prevent="searchBtn">查询</el-button>
            <el-button type="warning" icon="el-icon-refresh" @click="reset(formSearchRef)">重置</el-button>
            <el-button type="danger" icon="el-icon-download">全部导出</el-button>
            <el-button type="info" icon="el-icon-delete">批量删除</el-button>
            <!-- <el-button type="info" icon="el-icon-plus">添加</el-button>
                    <el-button>文本说明</el-button> -->
            <el-button icon="el-icon-sort" circle @click="tg(formSearchRef)"></el-button>
        </template>
    </com-search>
</template>

<script>
import { ref, reactive, unref } from 'vue';
// import HelloWorld from './components/HelloWorld.vue';
import ComSearch from '@/components/FormSearch/index.vue'; // form搜索组件
export default {
    name: 'App',
    components: { ComSearch },
    setup() {
        const formSearchRef = ref(null);
        const searchConfig = {
            labelWidth: '120px',
            props: [
                {
                    tag: 'input',
                    prop: 'menuName',
                    placeholder: '套餐名称',
                    label: '套餐名称',
                },
                {
                    tag: 'input',
                    prop: 'menuCode',
                    placeholder: '套餐编码',
                    label: '套餐编码',
                },
                {
                    tag: 'input',
                    prop: 'packageCode',
                    placeholder: '车电包编号',
                    label: '车电包编号',
                },
                {
                    tag: 'input',
                    prop: 'phone',
                    placeholder: '手机号',
                    label: '手机号',
                },
                {
                    tag: 'input',
                    prop: 'userId',
                    placeholder: '用户编号',
                    label: '用户编号',
                },
                {
                    tag: 'input',
                    prop: 'orderId',
                    placeholder: '订单编号',
                    label: '订单编号',
                },
                {
                    tag: 'input',
                    prop: 'thirdTradeNo',
                    placeholder: '交易流水号',
                    label: '交易流水号',
                },
                {
                    tag: 'datePicker',
                    prop: 'dateArr',
                    type: 'daterange',
                    format: 'YYYY-MM-DD',
                    placeholder: '创建时间',
                    label: '创建时间',
                    changeTime: (val, item, form) => {
                        console.log(val, item, form);
                    },
                },
                {
                    tag: 'select',
                    prop: 'menuType',
                    placeholder: '套餐类型',
                    options: [
                        { value: -1, label: '全部' },
                        { value: 0, label: '待支付' },
                        { value: 8, label: '待配送' },
                        { value: 1, label: '配送中' },
                        { value: 2, label: '已完成' },
                    ],
                    label: '套餐类型',
                },
                {
                    tag: 'select',
                    prop: 'authState',
                    placeholder: '鉴权状态',
                    options: [
                        { value: -1, label: '全部' },
                        { value: 0, label: '待支付' },
                        { value: 8, label: '待配送' },
                        { value: 1, label: '配送中' },
                        { value: 2, label: '已完成' },
                    ],
                    label: '鉴权状态',
                },
            ],
        };
        const filterForm = reactive({
            menuName: '', // 套餐名称
            menuCode: '', // 套餐编码
            packageCode: '', // 车电包编号
            phone: '', // 手机号
            userId: '', // 用户编号
            orderId: '', // 订单编号
            thirdTradeNo: '', // 订单流水号
            startTime: '', // 开始时间
            endTime: '', // 结束时间
            menuType: '', // 套餐类型
            authState: '', // 鉴权状态
        });
        const rules = {}; //查询条件校验

        const tg = (formSearchRef) => {
            unref(formSearchRef).toggleBtn();
        };
        const reset = (formSearchRef) => {
            unref(formSearchRef).resetField();
        };

        const searchBtn = () => {
            console.log(filterForm, 'params.....');
        };
        return {
            filterForm,
            rules,
            searchConfig,
            formSearchRef,
            searchBtn,
            tg,
            reset,
        };
    },
};

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    margin-top: 60px;
}
</style>
