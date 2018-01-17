export default [
    {text: 'Dashboard', icon: 'tachometer', children: [
        {text: '分析页', link: 'dashboard/analysis'},
        {text: '监控页', link: 'dashboard/monitor'},
        {text: '工作台', link: 'dashboard/workbench'}
    ]},
    {text: '表单页', icon: 'th', children: [
        {text: '基础表单', link: 'form/inline'},
        {text: '高级表单', link: 'form/advanced'},
        {text: '列表页面', link: 'form/listPage'},
        {text: '表格表单', link: 'form/tableForm'},
        {text: '分布表单', link: 'form/stepForm'}
    ]},
    {text: '系统监控', icon: 'code', children: [
        {text: '主机监控', link: 'monitor/host'}
    ]},
    {
        text: '第三方扩展', icon: 'cubes', children: [
            {text: '节点管理', link: 'nodeManager/index'},
            {text: '自定义Echarts', link: 'graph/index'}
        ]
    }
];
