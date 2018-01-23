import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Form from 'r-cmui/components/Form';
import Table from 'r-cmui/components/Table';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/FormControl/Label';
import '../../components/DomainLabels/OrignAddress';

class Comp extends React.Component {
    displayName = 'Comp';

    data = {
        domain: 'www.baidu.com',
        orignAddress: [
            {type: '0', isMain: true, id: '1', value: '1.1.1.1'},
            {type: '1', isMain: false, id: '2', value: 'www.asd.com'},
            {type: '0', isMain: false, id: '3', value: '1.1.1.1'},
            {type: '1', isMain: false, id: '4', value: 'www.asd.com'},
            {type: '0', isMain: false, id: '5', value: '1.1.1.1'}
        ],
        port: 8080,
        blockLoop: true,
        cacheType: [
            {type: 'dir', content: '/asd/', period: '1小时'},
            {type: 'ext', content: 'jpg,txt', period: '1小时'}
        ]
    };

    formatCacheType = (data) => {
        const columns = [
            {name: 'type', text: '类型'},
            {name: 'content', text: '内容'},
            {name: 'period', text: '过期时间'}
        ];
        return <Table bordered columns={columns} data={data}></Table>;
    }

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>详情页</Breadcrumb.Item>
                    <Breadcrumb.Item>表单详情</Breadcrumb.Item>
                </Breadcrumb>

                <Card title='域名配置' className='mt-30'>
                    <Form labelWidth={120} layout='stack-inline' data={this.data}>
                        <FormControl type='label' label='域名: ' name='domain'/>
                        <FormControl type='orignAddressLabel' label='源站地址: ' name='orignAddress'/>
                        <FormControl type='label' label='端口: ' name='port'/>
                        <FormControl type='label' label='分片回源: ' name='blockLoop' format={(v) => (v ? '开启' : '关闭')}/>
                        <FormControl type='label' label='缓存类型与过期时间: ' name='cacheType' format={this.formatCacheType} itemStyle={{height: 'auto'}}/>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Comp;
