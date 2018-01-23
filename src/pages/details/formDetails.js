import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Form from 'r-cmui/components/Form';
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
        ]
    };

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>详情页</Breadcrumb.Item>
                    <Breadcrumb.Item>表单详情</Breadcrumb.Item>
                </Breadcrumb>

                <Card title='域名配置' className='mt-30'>
                    <Form labelWidth={100} layout='stack-inline' data={this.data}>
                        <FormControl type='label' label='域名: ' name='domain'/>
                        <FormControl type='orignAddressLabel' label='回源地址: ' name='orignAddress'/>
                    </Form>
                </Card>
            </div>
        );
    }
}
export default Comp;
