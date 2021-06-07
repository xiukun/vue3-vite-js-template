/*
 * @Description: 模拟用户数据
 * @Autor: henry.xiukun
 * @Date: 2021-06-05 17:30:21
 * @LastEditors: henry.xiukun
 */
export default [
    {
        url: '/api/getUsers',
        method: 'get',
        response: ({ body }) => {
            console.log('body', body);
            return {
                code: 0,
                message: 'ok',
                data: ['tom', 'jerry'],
            };
        },
    },
];
