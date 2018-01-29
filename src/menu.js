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
    {text: '错误页', icon: 'exclamation-triangle', children: [
        {text: '404', link: 'errors/error404'},
        {text: '500', link: 'errors/error500'},
        {text: '通知', link: 'errors/notification'}
    ]},
    {text: '结果页', icon: 'key', children: [
        {text: '成功', link: 'result/success'},
        {text: '失败', link: 'result/error'}
    ]},
    {text: '详情页', icon: 'info-circle', children: [
        {text: '基础详情', link: 'details/base'},
        {text: '表单详情', link: 'details/formDetails'}
    ]},
    {text: '系统监控', icon: 'code', children: [
        {text: '主机监控', link: 'monitor/host'}
    ]},
    {
        text: '第三方扩展', icon: 'cubes', children: [
            {text: '节点管理', link: 'nodeManager/index'},
            {text: '自定义Echarts', link: 'graph/index'},
            {text: '截屏', link: 'screenshot/index'}
        ]
    }
];
