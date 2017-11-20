export default [
    {text: 'Dashboard', icon: 'tachometer', children: [
        {text: '分析页', link: 'dashboard/analysis'},
        {text: '监控页', link: 'dashboard/monitor'},
        {text: '工作台', link: 'dashboard/workbench'}
    ]},
    {text: '系统监控', icon: 'code', children: [
        {text: '主机监控', link: 'monitor/host'}
    ]},
    {text: '信用分', icon: 'futbol-o', link: 'xyf/index'},
    {text: 'Profile', icon: 'futbol-o', link: 'profile/index'}
];
