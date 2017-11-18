import React from 'react';
// import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts';
// import 'echarts/lib/chart/map';
// import 'echarts/lib/chart/scatter';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
// import 'echarts/lib/component/visualMap';
import ChinaData from './data/china';
// import ChinaData from './data/echina';

echarts.registerMap('china', ChinaData);

class MarkPointMap extends React.Component {
    displayName = 'MarkPointMap';

    static defaultProps = {
        height: 450,
        color: '#57AFFF'
    };

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    getLoadOption () {
        const placeList = [
            {name:'海门', geoCoord:[121.15, 31.89]},
            {name:'鄂尔多斯', geoCoord:[109.781327, 39.608266]},
            {name:'招远', geoCoord:[120.38, 37.35]},
            {name:'舟山', geoCoord:[122.207216, 29.985295]},
            {name:'齐齐哈尔', geoCoord:[123.97, 47.33]},
            {name:'盐城', geoCoord:[120.13, 33.38]},
            {name:'赤峰', geoCoord:[118.87, 42.28]},
            {name:'青岛', geoCoord:[120.33, 36.07]},
            {name:'乳山', geoCoord:[121.52, 36.89]},
            {name:'金昌', geoCoord:[102.188043, 38.520089]},
            {name:'泉州', geoCoord:[118.58, 24.93]},
            {name:'莱西', geoCoord:[120.53, 36.86]},
            {name:'日照', geoCoord:[119.46, 35.42]},
            {name:'胶南', geoCoord:[119.97, 35.88]},
            {name:'南通', geoCoord:[121.05, 32.08]},
            {name:'拉萨', geoCoord:[91.11, 29.97]},
            {name:'云浮', geoCoord:[112.02, 22.93]},
            {name:'梅州', geoCoord:[116.1, 24.55]},
            {name:'文登', geoCoord:[122.05, 37.2]},
            {name:'上海', geoCoord:[121.48, 31.22]},
            {name:'攀枝花', geoCoord:[101.718637, 26.582347]},
            {name:'威海', geoCoord:[122.1, 37.5]},
            {name:'承德', geoCoord:[117.93, 40.97]},
            {name:'厦门', geoCoord:[118.1, 24.46]},
            {name:'汕尾', geoCoord:[115.375279, 22.786211]},
            {name:'潮州', geoCoord:[116.63, 23.68]},
            {name:'丹东', geoCoord:[124.37, 40.13]},
            {name:'太仓', geoCoord:[121.1, 31.45]},
            {name:'曲靖', geoCoord:[103.79, 25.51]},
            {name:'烟台', geoCoord:[121.39, 37.52]},
            {name:'福州', geoCoord:[119.3, 26.08]},
            {name:'瓦房店', geoCoord:[121.979603, 39.627114]},
            {name:'即墨', geoCoord:[120.45, 36.38]},
            {name:'抚顺', geoCoord:[123.97, 41.97]},
            {name:'玉溪', geoCoord:[102.52, 24.35]},
            {name:'张家口', geoCoord:[114.87, 40.82]},
            {name:'阳泉', geoCoord:[113.57, 37.85]},
            {name:'莱州', geoCoord:[119.942327, 37.177017]},
            {name:'湖州', geoCoord:[120.1, 30.86]},
            {name:'汕头', geoCoord:[116.69, 23.39]},
            {name:'昆山', geoCoord:[120.95, 31.39]},
            {name:'宁波', geoCoord:[121.56, 29.86]},
            {name:'湛江', geoCoord:[110.359377, 21.270708]},
            {name:'揭阳', geoCoord:[116.35, 23.55]},
            {name:'荣成', geoCoord:[122.41, 37.16]},
            {name:'连云港', geoCoord:[119.16, 34.59]},
            {name:'葫芦岛', geoCoord:[120.836932, 40.711052]},
            {name:'常熟', geoCoord:[120.74, 31.64]},
            {name:'东莞', geoCoord:[113.75, 23.04]},
            {name:'河源', geoCoord:[114.68, 23.73]},
            {name:'淮安', geoCoord:[119.15, 33.5]},
            {name:'泰州', geoCoord:[119.9, 32.49]},
            {name:'南宁', geoCoord:[108.33, 22.84]},
            {name:'营口', geoCoord:[122.18, 40.65]},
            {name:'惠州', geoCoord:[114.4, 23.09]},
            {name:'江阴', geoCoord:[120.26, 31.91]},
            {name:'蓬莱', geoCoord:[120.75, 37.8]},
            {name:'韶关', geoCoord:[113.62, 24.84]},
            {name:'嘉峪关', geoCoord:[98.289152, 39.77313]},
            {name:'广州', geoCoord:[113.23, 23.16]},
            {name:'延安', geoCoord:[109.47, 36.6]},
            {name:'太原', geoCoord:[112.53, 37.87]},
            {name:'清远', geoCoord:[113.01, 23.7]},
            {name:'中山', geoCoord:[113.38, 22.52]},
            {name:'昆明', geoCoord:[102.73, 25.04]},
            {name:'寿光', geoCoord:[118.73, 36.86]},
            {name:'盘锦', geoCoord:[122.070714, 41.119997]},
            {name:'长治', geoCoord:[113.08, 36.18]},
            {name:'深圳', geoCoord:[114.07, 22.62]},
            {name:'珠海', geoCoord:[113.52, 22.3]},
            {name:'宿迁', geoCoord:[118.3, 33.96]},
            {name:'咸阳', geoCoord:[108.72, 34.36]},
            {name:'铜川', geoCoord:[109.11, 35.09]},
            {name:'平度', geoCoord:[119.97, 36.77]},
            {name:'佛山', geoCoord:[113.11, 23.05]},
            {name:'海口', geoCoord:[110.35, 20.02]},
            {name:'江门', geoCoord:[113.06, 22.61]},
            {name:'章丘', geoCoord:[117.53, 36.72]},
            {name:'肇庆', geoCoord:[112.44, 23.05]},
            {name:'大连', geoCoord:[121.62, 38.92]},
            {name:'临汾', geoCoord:[111.5, 36.08]},
            {name:'吴江', geoCoord:[120.63, 31.16]},
            {name:'石嘴山', geoCoord:[106.39, 39.04]},
            {name:'沈阳', geoCoord:[123.38, 41.8]},
            {name:'苏州', geoCoord:[120.62, 31.32]},
            {name:'茂名', geoCoord:[110.88, 21.68]},
            {name:'嘉兴', geoCoord:[120.76, 30.77]},
            {name:'长春', geoCoord:[125.35, 43.88]},
            {name:'胶州', geoCoord:[120.03336, 36.264622]},
            {name:'银川', geoCoord:[106.27, 38.47]},
            {name:'张家港', geoCoord:[120.555821, 31.875428]},
            {name:'三门峡', geoCoord:[111.19, 34.76]},
            {name:'锦州', geoCoord:[121.15, 41.13]},
            {name:'南昌', geoCoord:[115.89, 28.68]},
            {name:'柳州', geoCoord:[109.4, 24.33]},
            {name:'三亚', geoCoord:[109.511909, 18.252847]},
            {name:'自贡', geoCoord:[104.778442, 29.33903]},
            {name:'吉林', geoCoord:[126.57, 43.87]},
            {name:'阳江', geoCoord:[111.95, 21.85]},
            {name:'泸州', geoCoord:[105.39, 28.91]},
            {name:'西宁', geoCoord:[101.74, 36.56]},
            {name:'宜宾', geoCoord:[104.56, 29.77]},
            {name:'呼和浩特', geoCoord:[111.65, 40.82]},
            {name:'成都', geoCoord:[104.06, 30.67]},
            {name:'大同', geoCoord:[113.3, 40.12]},
            {name:'镇江', geoCoord:[119.44, 32.2]},
            {name:'桂林', geoCoord:[110.28, 25.29]},
            {name:'张家界', geoCoord:[110.479191, 29.117096]},
            {name:'宜兴', geoCoord:[119.82, 31.36]},
            {name:'北海', geoCoord:[109.12, 21.49]},
            {name:'西安', geoCoord:[108.95, 34.27]},
            {name:'金坛', geoCoord:[119.56, 31.74]},
            {name:'东营', geoCoord:[118.49, 37.46]},
            {name:'牡丹江', geoCoord:[129.58, 44.6]},
            {name:'遵义', geoCoord:[106.9, 27.7]},
            {name:'绍兴', geoCoord:[120.58, 30.01]},
            {name:'扬州', geoCoord:[119.42, 32.39]},
            {name:'常州', geoCoord:[119.95, 31.79]},
            {name:'潍坊', geoCoord:[119.1, 36.62]},
            {name:'重庆', geoCoord:[106.54, 29.59]},
            {name:'台州', geoCoord:[121.420757, 28.656386]},
            {name:'南京', geoCoord:[118.78, 32.04]},
            {name:'滨州', geoCoord:[118.03, 37.36]},
            {name:'贵阳', geoCoord:[106.71, 26.57]},
            {name:'无锡', geoCoord:[120.29, 31.59]},
            {name:'本溪', geoCoord:[123.73, 41.3]},
            {name:'克拉玛依', geoCoord:[84.77, 45.59]},
            {name:'渭南', geoCoord:[109.5, 34.52]},
            {name:'马鞍山', geoCoord:[118.48, 31.56]},
            {name:'宝鸡', geoCoord:[107.15, 34.38]},
            {name:'焦作', geoCoord:[113.21, 35.24]},
            {name:'句容', geoCoord:[119.16, 31.95]},
            {name:'北京', geoCoord:[116.46, 39.92]},
            {name:'徐州', geoCoord:[117.2, 34.26]},
            {name:'衡水', geoCoord:[115.72, 37.72]},
            {name:'包头', geoCoord:[110, 40.58]},
            {name:'绵阳', geoCoord:[104.73, 31.48]},
            {name:'乌鲁木齐', geoCoord:[87.68, 43.77]},
            {name:'枣庄', geoCoord:[117.57, 34.86]},
            {name:'杭州', geoCoord:[120.19, 30.26]},
            {name:'淄博', geoCoord:[118.05, 36.78]},
            {name:'鞍山', geoCoord:[122.85, 41.12]},
            {name:'溧阳', geoCoord:[119.48, 31.43]},
            {name:'库尔勒', geoCoord:[86.06, 41.68]},
            {name:'安阳', geoCoord:[114.35, 36.1]},
            {name:'开封', geoCoord:[114.35, 34.79]},
            {name:'济南', geoCoord:[117, 36.65]},
            {name:'德阳', geoCoord:[104.37, 31.13]},
            {name:'温州', geoCoord:[120.65, 28.01]},
            {name:'九江', geoCoord:[115.97, 29.71]},
            {name:'邯郸', geoCoord:[114.47, 36.6]},
            {name:'临安', geoCoord:[119.72, 30.23]},
            {name:'兰州', geoCoord:[103.73, 36.03]},
            {name:'沧州', geoCoord:[116.83, 38.33]},
            {name:'临沂', geoCoord:[118.35, 35.05]},
            {name:'南充', geoCoord:[106.110698, 30.837793]},
            {name:'天津', geoCoord:[117.2, 39.13]},
            {name:'富阳', geoCoord:[119.95, 30.07]},
            {name:'泰安', geoCoord:[117.13, 36.18]},
            {name:'诸暨', geoCoord:[120.23, 29.71]},
            {name:'郑州', geoCoord:[113.65, 34.76]},
            {name:'哈尔滨', geoCoord:[126.63, 45.75]},
            {name:'聊城', geoCoord:[115.97, 36.45]},
            {name:'芜湖', geoCoord:[118.38, 31.33]},
            {name:'唐山', geoCoord:[118.02, 39.63]},
            {name:'平顶山', geoCoord:[113.29, 33.75]},
            {name:'邢台', geoCoord:[114.48, 37.05]},
            {name:'德州', geoCoord:[116.29, 37.45]},
            {name:'济宁', geoCoord:[116.59, 35.38]},
            {name:'荆州', geoCoord:[112.239741, 30.335165]},
            {name:'宜昌', geoCoord:[111.3, 30.7]},
            {name:'义乌', geoCoord:[120.06, 29.32]},
            {name:'丽水', geoCoord:[119.92, 28.45]},
            {name:'洛阳', geoCoord:[112.44, 34.7]},
            {name:'秦皇岛', geoCoord:[119.57, 39.95]},
            {name:'株洲', geoCoord:[113.16, 27.83]},
            {name:'石家庄', geoCoord:[114.48, 38.03]},
            {name:'莱芜', geoCoord:[117.67, 36.19]},
            {name:'常德', geoCoord:[111.69, 29.05]},
            {name:'保定', geoCoord:[115.48, 38.85]},
            {name:'湘潭', geoCoord:[112.91, 27.87]},
            {name:'金华', geoCoord:[119.64, 29.12]},
            {name:'岳阳', geoCoord:[113.09, 29.37]},
            {name:'长沙', geoCoord:[113, 28.21]},
            {name:'衢州', geoCoord:[118.88, 28.97]},
            {name:'廊坊', geoCoord:[116.7, 39.53]},
            {name:'菏泽', geoCoord:[115.480656, 35.23375]},
            {name:'合肥', geoCoord:[117.27, 31.86]},
            {name:'武汉', geoCoord:[114.31, 30.52]},
            {name:'大庆', geoCoord:[125.03, 46.58]}
        ];

        function randomValue () {
            return Math.round(Math.random() * 1000);
        }
        
        return {
            title : {
                text: '大规模MarkPoint特效',
                x:'center',
                textStyle : {
                    color: '#fff'
                }
            },
            legend: {
                orient: 'vertical',
                x:'left',
                data:['弱'],
                textStyle : {
                    color: '#fff'
                }
            },
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                text: ['High','Low'],
                seriesIndex: [1],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable : true
            },
            series : [
                {
                    name: '弱',
                    type: 'map',
                    mapType: 'china',
                    data:[
                        {name: '北京', value: randomValue()},
                        {name: '天津', value: randomValue()},
                        {name: '上海', value: randomValue()},
                        {name: '重庆', value: randomValue()},
                        {name: '河北', value: randomValue()},
                        {name: '河南', value: randomValue()},
                        {name: '云南', value: randomValue()},
                        {name: '辽宁', value: randomValue()},
                        {name: '黑龙江', value: randomValue()},
                        {name: '湖南', value: randomValue()},
                        {name: '安徽', value: randomValue()},
                        {name: '山东', value: randomValue()},
                        {name: '新疆', value: randomValue()},
                        {name: '江苏', value: randomValue()},
                        {name: '浙江', value: randomValue()},
                        {name: '江西', value: randomValue()},
                        {name: '湖北', value: randomValue()},
                        {name: '广西', value: randomValue()},
                        {name: '甘肃', value: randomValue()},
                        {name: '山西', value: randomValue()},
                        {name: '内蒙古', value: randomValue()},
                        {name: '陕西', value: randomValue()},
                        {name: '吉林', value: randomValue()},
                        {name: '福建', value: randomValue()},
                        {name: '贵州', value: randomValue()},
                        {name: '广东', value: randomValue()},
                        {name: '青海', value: randomValue()},
                        {name: '西藏', value: randomValue()},
                        {name: '四川', value: randomValue()},
                        {name: '宁夏', value: randomValue()},
                        {name: '海南', value: randomValue()},
                        {name: '台湾', value: randomValue()},
                        {name: '香港', value: randomValue()},
                        {name: '澳门', value: randomValue()}
                    ]
                }
            ]
        };
    }

    componentDidMount () {
        const chart = echarts.init(this.refs.map);
        const data = [
            {name: '上海', value: 25}
        ];
        
        const geoCoordMap = {
            '上海':[120,30]
        };
        
        function convertData (data) {
            const res = [];
            for (let i = 0; i < data.length; i++) {
                const geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        }
        
        function randomValue () {
            return Math.round(Math.random() * 1000);
        }
        
        
        const option = {
            tooltip: {},
            visualMap: {
                min: 0,
                max: 1500,
                left: 'left',
                top: 'bottom',
                text: ['High','Low'],
                seriesIndex: [1],
                inRange: {
                    color: ['#e0ffff', '#006edd']
                },
                calculable : true
            },
            geo: {
                map: 'china',
                roam: false,
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            color: 'rgba(0,0,0,0.4)'
                        }
                    }
                },
                itemStyle: {
                    normal:{
                        borderColor: 'rgba(0, 0, 0, 0.2)'
                    },
                    emphasis:{
                        areaColor: null,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        shadowBlur: 20,
                        borderWidth: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            series : [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertData(data),
                    symbolSize: 20
                },
                {
                    name: 'xxx',
                    type: 'map',
                    geoIndex: 0,
                    data:[
                        {name: '北京', value: randomValue()},
                        {name: '天津', value: randomValue()},
                        {name: '上海', value: randomValue()}
                    ]
                }
            ]
        };
        if (option && typeof option === 'object') {
            chart.setOption(option, true);
        }
    }
    render () {
        return (
            // <ReactEcharts
            //     ref={(e) => { this.chart = e; }}
            //     option={this.getLoadOption()}
            //     style={{height: this.props.height}}
            // />
            <div ref='map' style={{height: 450}}></div>
        );
    }
}
export default MarkPointMap;
