<!--
 * @Description: form查询搜索组件
 * @Autor: henry.xiukun
 * @Date: 2021-06-13 15:46:38
 * @LastEditors: henry.xiukun
-->

<template>
    <div class="content" :style="selfStyle">
        <el-form
            ref="formRef"
            style="overflow: auto"
            :model="nform"
            :rules="rules"
            :status-icon="statusIcon"
            :label-width="labelWidth"
            :label-position="labelPosition"
            :inline="inline"
            @submit.prevent
        >
            <slot name="header" />
            <template v-for="(key, index) in attrs">
                <el-form-item v-if="!key.hide" v-show="Number(index) < count" :key="key.prop" :label="key.label" :prop="key.prop">
                    <!-- input组件 -->
                    <el-input
                        v-if="isShow(key, 'input')"
                        v-model="nform[key.prop]"
                        :type="key.type ? key.type : 'text'"
                        autocomplete="off"
                        :placeholder="key.placeholder ? key.placeholder : '请输入'"
                        :maxlength="key.maxLength"
                        :minlength="key.minLength"
                        :rows="key.rows"
                        :step="key.step"
                        :suffix-icon="key.suffixIcon"
                        :prefix-icon="key.prefixIcon"
                        :autofocus="key.autofocus ? key.autofocus : false"
                        :class="{ 'show-word-limit-input': !!key.maxLength }"
                        :disabled="key.disabled"
                        show-word-limit
                        clearable
                    >
                        <template v-if="key.unit" #append>{{ key.unit }}</template>
                    </el-input>
                    <!-- select组件 -->
                    <el-select
                        v-else-if="isShow(key, 'select')"
                        v-model="nform[key.prop]"
                        :filterable="key.filterable"
                        :remote="key.remoteMethod ? true : false"
                        :remote-method="key.remoteMethod"
                        :disabled="key.disabled"
                        :default-first-option="typeof key.defaultFirstOption === 'boolean' ? key.clearable : true"
                        :multiple="key.multiple"
                        :clearable="typeof key.clearable === 'boolean' ? key.clearable : true"
                        :placeholder="key.placeholder ? key.placeholder : '请选择'"
                        @change="(val) => changeSelect(val, key, nform)"
                    >
                        <el-option
                            v-for="(option, i) in key.options"
                            :key="i"
                            :label="option[key.keyProp ? key.keyProp.label : 'label']"
                            :value="option[key.keyProp ? key.keyProp.value : 'value']"
                        >
                            <template v-if="key.customOption">
                                <span style="float: left">{{ key.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ key.value }}</span>
                            </template>
                        </el-option>
                    </el-select>
                    <!-- cascader 级联选择器 -->
                    <el-cascader
                        v-else-if="isShow(key, 'cascader')"
                        v-model="nform[key.prop]"
                        :placeholder="key.placeholder ? key.placeholder : `请输入${key.label}`"
                        :options="key.options"
                        :props="key.optionProps"
                        clearable
                        @change="(val) => changeCascader(val, key)"
                    ></el-cascader>
                    <!-- DatePicker 日期选择器 -->
                    <el-date-picker
                        v-else-if="isShow(key, 'datePicker')"
                        v-model="nform[key.prop]"
                        :disabled="key.disabled ?? false"
                        :type="key.type ?? 'datetimerange'"
                        range-separator="至"
                        :format="key.format || 'YYYY-MM-DD HH:mm:ss'"
                        :placeholder="key.placeholder ?? '请选择'"
                        :start-placeholder="key.startPlaceholder ?? '开始时间'"
                        :end-placeholder="key.endPlaceholder ?? '结束时间'"
                        :clearable="key.clearable ?? true"
                        :default-time="key.defaultTime ?? [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 6, 1, 23, 59, 59)]"
                        @change="(val) => changeTime(val, key)"
                    ></el-date-picker>
                    <!-- checkbox -->
                    <el-checkbox-group
                        v-else-if="isShow(key, 'checkbox')"
                        v-model="nform[key.prop]"
                        :disabled="key.disabled"
                        :min="key.min ? key.min : 0"
                        :max="key.max ? key.max : 1000"
                    >
                        <el-checkbox v-for="opt in key.options" :key="opt.value" :label="opt.value" :disabled="opt.disabled" :value="opt.value">{{
                            opt.label
                        }}</el-checkbox>
                    </el-checkbox-group>
                    <!-- radio -->
                    <el-radio-group v-else-if="isShow(key, 'radio')" v-model="nform[key.prop]">
                        <el-radio
                            v-for="radio in key.options"
                            :key="radio.label"
                            :disabled="key.disabled"
                            :label="radio.value"
                            :value="radio.value"
                            >{{ radio.label }}</el-radio
                        >
                    </el-radio-group>
                    <el-radio-group v-else-if="isShow(key, 'radioButton')" v-model="nform[key.prop]">
                        <el-radio-button v-for="radio in key.options" :key="radio.label" :disabled="key.disabled" :label="radio.value">{{
                            radio.label
                        }}</el-radio-button>
                    </el-radio-group>
                    <!-- switch -->
                    <el-switch
                        v-else-if="isShow(key, 'switch')"
                        v-model="nform[key.prop]"
                        :active-value="key.activeValue"
                        :inactive-value="key.inactiveValue"
                    >
                    </el-switch>
                </el-form-item>
            </template>
            <el-form-item style="float: right; right: 20px">
                <slot name="search" />
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, toRefs } from 'vue';
import { resetFields } from '@/utils/formExtend';
import dayjs from 'dayjs';

//#region 组件change事件集合..
const changeCascader = (val, item) => {
    if (item.change) {
        item.change(val, item);
    }
};

const changeTime = (val, obj) => {
    console.log(val, obj);
    if (Array.isArray(val)) {
        const newArray = val.map((item) => {
            if (obj.type === 'daterange') {
                return dayjs(item).format('YYYY-MM-DD');
            } else {
                return dayjs(item).format('YYYY-MM-DD HH:mm:ss');
            }
        });
        obj.changeTime(newArray, obj);
    } else if (obj && obj.changeTime) {
        obj.changeTime(val !== null ? dayjs(val).format('YYYY-MM-DD') : val, obj);
    }
};

const changeSelect = (val, item, form) => {
    if (item.change) {
        item.change(val, item, form);
    }
};
//#endregion
// 函数集合追加到setup中
const changeFn = {
    changeCascader,
    changeTime,
    changeSelect,
};

export default defineComponent({
    name: 'ComFormSearch',
    props: {
        showCol: {
            //默认展示3列数据
            type: Number,
            default: 3,
        },
        form: {
            type: Object,
            default: () => {},
        },
        rules: {
            type: Object,
            default: () => {},
        },
        //查询条件集合
        props: {
            type: Object,
            default: () => {},
        },
        //是否行内表单模式 默认true
        inline: {
            type: Boolean,
            default: false,
        },
        //表单域标签的宽度 支持auto
        labelWidth: {
            type: String,
            default: '100px',
        },
        //表单域标签的位置 默认right对齐
        labelPosition: {
            type: String,
            default: 'right',
        },
        statusIcon: {
            type: Boolean,
            default: true,
        },
        style: {
            type: String,
            default: 'padding-top: 15px',
        },
        selfStyle: {
            type: String,
            default: 'padding-top: 15px',
        },
    },
    setup(props) {
        const formRef = ref(null);
        const expand = ref(false); //默认闭合
        console.log(props.props);
        const formData = reactive({ nform: props.form, attrs: [...props.props.props] });
        const count = computed(() => (expand.value ? formData.attrs.length : props.showCol));
        // 开合切换按钮
        const toggleBtn = () => {
            expand.value = !expand.value;
        };
        // 重置form
        const resetField = () => {
            resetFields(formRef);
        };
        const refresh = (data) => {
            attrs = data;
        };
        const isShow = (item, tag) => {
            return item.tag === tag;
        };

        return {
            formRef,
            ...toRefs(formData),
            expand,
            count,
            toggleBtn,
            resetField,
            refresh,
            isShow,
            ...changeFn,
        };
    },
});
</script>
<style lang="scss" scoped>
.content {
    background-color: #fff;
    //   padding-top: 15px;
}
</style>
