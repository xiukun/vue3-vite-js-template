/*
 * @Description:按需引入
 * @Autor: henry.xiukun
 * @Date: 2021-06-05 17:12:35
 * @LastEditors: henry.xiukun
 */
import { locale, ElButton } from 'element-plus'; // Element Plus 组件内部默认使用英语
// 插件按需引入 Element Plus 设置中文要独立引入locale
import lang from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';
// import locale from 'element-plus/lib/locale';

export default function (app) {
    locale(lang); //默认英文，初始化设置为中文
    // 组件列表
    const components = [ElButton];

    components.forEach((component) => {
        app.component(component.name, component);
    });

    // 全局配置
    // 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸 small，zIndex 设置弹框的初始 z-index（默认值：2000）
    app.config.globalProperties.$ELEMENT = {
        size: 'medium',
    };
    // 完整引入
    // app.use(ElementPlus, { size: 'small', zIndex: 2000, locale });
}
