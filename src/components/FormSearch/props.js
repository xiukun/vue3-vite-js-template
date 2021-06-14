/*
 * @Description: 组件props
 * @Autor: henry.xiukun
 * @Date: 2021-06-13 15:46:38
 * @LastEditors: henry.xiukun
 */
export default {
    showCol: {
        // 默认展示3列数据
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
    // 查询条件集合
    props: {
        type: Array,
        default: () => {},
    },
    // 是否行内表单模式 默认true
    inline: {
        type: Boolean,
        default: false,
    },
    // 表单域标签的宽度 支持auto
    LabelWidth: {
        type: String,
        default: '100px',
    },
    // 表单域标签的位置 默认right对齐
    LabelPosition: {
        type: String,
        default: 'right',
    },
    StatusIcon: {
        type: Boolean,
        default: true,
    },
};
