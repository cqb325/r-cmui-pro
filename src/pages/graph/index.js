import React from 'react';
import ReactEchartsCore from 'echarts-for-react/lib/core';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class BarChart extends React.Component {
    displayName = 'Chart1';

    static defaultProps = {
        height: 450,
        color: '#57AFFF'
    };

    data = [[0, 1, 50, '注册','26107次'], [1, 2, 30,'登录','26107次'], [2, 3, 20,'购买','26107次']];
    max = 0;

    getInstance () {
        return this.chart.getEchartsInstance();
    }

    renderItem (params, api) {
        const yValue = api.value(2);
        this.max = Math.max(this.max, yValue);
        const start = api.coord([api.value(0), yValue]);
        const size = api.size([api.value(1) - api.value(0), yValue]);
        const style = api.style();
        return {
            type: 'rect',
            shape: {
                x: start[0] - size[0] / 2,
                y: start[1],
                width: size[0] / 3,
                height: size[1]
            },
            style
        };
    }

    renderTextItem (params, api) {
        const yValue = this.max;
        const start = api.coord([api.value(0), yValue]);
        const size = api.size([api.value(1) - api.value(0), yValue]);
        const style = api.style();
        return {
            type: 'line',
            shape: {
                x1: start[0] - size[0] / 2 + 5,
                y1: start[1] - 30,
                x2: start[0] - size[0] / 6,
                y2: start[1] - 30
            },
            style
        };
    } 

    renderItem2 (params, api) {
        const levelData = this.data;
        const yValue = api.value(2);
        const size = api.size([api.value(1) - api.value(0), yValue]);
        const start1 = api.coord([api.value(0), yValue]);
        const index = api.value(1) === levelData.length ? api.value(0) : api.value(1);
        const start2 = api.coord([api.value(1), levelData[index][2]]);
        const start3 = api.coord([api.value(1), 0]);
        const style = api.style({
            fill: 'rgba(46,157,247,0.2)'
        });
        const points = [];
        const tl = [start1[0] - size[0] / 6, start1[1]];
        let tr = [start2[0] - size[0] / 2, start2[1]];
        const br = [start2[0] - size[0] / 2, start3[1]];
        const bl = [start1[0] - size[0] / 6, start3[1]];
        if (this.startx2 === levelData.length - 1) {
            tr = tl;
            br[0] = tl[0];
            bl[0] = tl[0];
        }
        points.push(tl);
        points.push(tr);
        points.push(br);
        points.push(bl);
        this.startx2 ++;
        return {
            type: 'polygon',
            shape: {
                points
            },
            style
        };
    }

    getLoadOption () {
        const legends = ['注册','登录','购买'];
        let data = this.data;
        data = echarts.util.map(data, (item) => {
            return {
                value: item,
                itemStyle: {
                    normal: {
                        color: '#2E9DF7'
                    }
                }
            };
        });
        
        return {
            grid: {
                top: 50
            },
            tooltip: {
                show: true,
                formatter: (a) => {
                    return `${a.value[3]}: ${a.value[2]}%`;
                }
            },
            xAxis: {
                show: false,
                scale: true,
                data: legends
                
            },
            yAxis: {
                show: false
            },
            series: [{
                type: 'custom',
                renderItem: this.renderItem.bind(this),
                dimensions: ['a','b','占比'],
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: (a) => {
                            return `${a.value[2]}%`;
                        }
                    }
                },
                encode: {
                    x: [0, 1],
                    y: 2,
                    tooltip: [2]
                },
                data
            },{
                type: 'custom',
                renderItem: this.renderItem2.bind(this),
                dimensions: ['a','b','占比'],
                silent: true,
                encode: {
                    y: 2
                },
                data
            },{
                type: 'custom',
                renderItem: this.renderTextItem.bind(this),
                dimensions: ['a','b','占比'],
                silent: true,
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        align: 'left',
                        formatter: (a) => {
                            return `${a.value[3]}\n\n${a.value[4]}`;
                        }
                    }
                },
                encode: {
                    x: [0, 1],
                    y: 2
                },
                data
            }]
        };
    }

    render () {
        return (
            <ReactEchartsCore
                echarts={echarts}
                ref={(e) => { this.chart = e; }}
                option={this.getLoadOption()}
                style={{height: this.props.height, marginTop: 50}}
            />
        );
    }
}

export default BarChart;
