import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Button from 'r-cmui/components/Button';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import moment from 'moment';
import 'r-cmui/components/Input';
import 'r-cmui/components/DateRange';
import 'r-cmui/components/TextArea';
import 'r-cmui/components/RadioGroup';

import './styles.less';

class BaseForm extends React.Component {
    displayName = 'BaseForm';

    targetOpen = [
        {id: '0', text: '公开'},
        {id: '1', text: '部分公开'},
        {id: '2', text: '不公开'}
    ];

    saveFormRef = (ref) => {
        this.form = ref;
    }

    save = () => {
        if (this.form.isValid()) {
            const params = this.form.getFormParams();
            console.log(params);
            this.form.submit();
        }
    }

    render () {
        const doday = moment().format('YYYY-MM-DD');
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单页</Breadcrumb.Item>
                    <Breadcrumb.Item>基础表单</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <Row>
                        <Col grid={0.6}>
                            <Form ref={this.saveFormRef} ajax action='xxx' method='post' labelWidth={80}>
                                <Row>
                                    <FormControl name='title' label='标题:' type='text' placeholder='给我起个名字' required/>
                                </Row>
                                <Row>
                                    <FormControl name='startEndDate' label='起止日期:' type='daterange' required endDate={doday}/>
                                </Row>
                                <Row>
                                    <FormControl name='goal' label='目标描述:' type='textarea' required height={100}/>
                                </Row>
                                <Row>
                                    <FormControl name='standard' label='衡量标准:' type='textarea' required height={100}/>
                                </Row>
                                <Row>
                                    <FormControl name='client' label='客户:' type='text' />
                                </Row>
                                <Row>
                                    <FormControl name='invited' label='邀评人:' type='text' />
                                </Row>
                                <Row>
                                    <FormControl name='weight' label='权重:' type='number' itemStyle={{width: 147}}/><span>%</span>
                                </Row>
                                <Row>
                                    <FormControl name='isOpen' label='目标公开:' value='0' type='radio' data={this.targetOpen}/>
                                </Row>
                                <Row>
                                    <Form.Promote>客户、邀评人默认被分享</Form.Promote>
                                </Row>
                            </Form>
                            <div className='mt-40 ml-40'>
                                <Button theme='primary' className='mr-25' onClick={this.save}>保 存</Button>
                                <Button theme='default' className='ml-25'>取 消</Button>
                            </div>
                        </Col>
                    </Row>

                    
                </Card>
            </div>
        );
    }
}
export default BaseForm;
