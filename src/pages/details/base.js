import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Grid from 'r-cmui/components/Grid';
import Progress from 'r-cmui/components/Progress';
import moment from 'moment';

class Comp extends React.Component {
    displayName = 'Comp';

    columns= [
        {text: '序号', type: 'index'},
        {name: 'host', text: '主机名称'},
        {name: 'mode', text: '计算模式'},
        {name: 'progress', text: '进度', width: 150, format: (v, column, row) => {
            return <Progress key={row.id} value={v} strokeWidth={4} showPercent={false}/>;
        }},
        {name: 'startTime', text: '开始时间', width: 130}
    ];

    render () {
        const data = [];
        for (let i = 0; i < 300; i++) {
            data.push({
                id: `id_${i}`,
                host: `主机${i}`,
                mode: `计算模式${i}`,
                progress: Math.random() * 100,
                startTime: moment().add(-parseInt(Math.random() * 50, 10), 'hours').format('YYYY-MM-DD HH:mm:ss')
            });
        }
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>详情页</Breadcrumb.Item>
                    <Breadcrumb.Item>基础详情页</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30' title='面板详情'>
                    <Row>
                        <Col grid={1 / 3}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10'>面板元素名称:</label>
                                <span>CPU监控面板</span>
                            </div>
                        </Col>
                        <Col grid={1 / 3}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10'>机房:</label>
                                <span>虹桥机房</span>
                            </div>
                        </Col>
                        <Col grid={1 / 3}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10'>监控类型:</label>
                                <span>边缘节点</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col grid={1 / 3}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10'>指标:</label>
                                <span>cdn.host.cpu.use</span>
                            </div>
                        </Col>
                        <Col grid={1 / 3}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10'>监控周期:</label>
                                <span>1天</span>
                            </div>
                        </Col>
                        <Col grid={1 / 3}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10'>统计类型:</label>
                                <span>折线图</span>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col grid={1 / 2}>
                            <div className='cm-form-group'>
                                <label className='text-promote mr-10' style={{verticalAlign: 'top'}}>描述:</label>
                                <span style={{display: 'inline-block', width: '80%', wordBreak: 'break-all'}}>监控描述监控描述监控描述监控描述监控描述监控描述监控描述监控描述监控描述</span>
                            </div>
                        </Col>
                    </Row>
                </Card>

                <Card title='计算进度' className='mt-30' bodyStyle={{height: 500}}>
                    <Grid columns={this.columns} data={data} border total={data.length} pageSize={50} pageNum={1} smart/>
                </Card>
            </div>
        );
    }
}
export default Comp;
