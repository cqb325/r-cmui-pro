import React from 'react';

import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Steps from 'r-cmui/components/Steps';
import Button from 'r-cmui/components/Button';
import FontIcon from 'r-cmui/components/FontIcon';
import Form from 'r-cmui/components/Form';
import MessageBox from 'r-cmui/components/MessageBox';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/Input';
import 'r-cmui/components/FormControl/Label';

import { inject, observer } from 'mobx-react';

@inject('baseForm')
@observer
class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        current: 0
    }

    next = () => {
        this.setState({
            current: this.state.current + 1
        });
    }

    prev = () => {
        this.setState({
            current: this.state.current - 1
        });
    }

    gotoCheck = () => {
        if (this.form1.isValid()) {
            const params = this.form1.getFormParams();
            this.form2.setData(params);
            this.next();
        }
    }

    submit = async () => {
        if (this.form2.isValid()) {
            const params = this.form2.getFormParams();
            const ret = await this.props.baseForm.postData(params);
            if (ret && ret.success) {
                this.form3.setData(params);
                this.next();
            } else {
                this.tip.show('提交失败， 请联系管理员');
            }
        }
    }
    
    render () {
        const {baseForm} = this.props;
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单</Breadcrumb.Item>
                    <Breadcrumb.Item>分布表单</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <div style={{width: '50%', margin: '0 auto'}}>
                        <Steps ref={(f) => this.steps = f} current={this.state.current}>
                            <Steps.Step title='填写转账信息'></Steps.Step>
                            <Steps.Step title='确认转账信息'></Steps.Step>
                            <Steps.Step title='完成'></Steps.Step>
                        </Steps>
                    </div>

                    <div style={{width: 400, margin: '0 auto'}}>
                        <div style={{display: this.state.current === 0 ? 'block' : 'none'}}>
                            <Form layout='stack-inline' labelWidth={90} className='mt-50' ref={(f) => this.form1 = f}>
                                <FormControl type='text' label='付款账户: ' name='payCount' required/>
                                <FormControl type='text' label='收款账户: ' name='receiptCount' required/>
                                <FormControl type='text' label='收款人姓名: ' name='receiptName' required/>
                                <FormControl type='number' label='转账金额: ' name='amount' required/>

                                <div className='mt-15' style={{paddingLeft: 90}}>
                                    <Button onClick={this.gotoCheck} theme='primary'>下一步</Button>
                                </div>
                            </Form>
                        </div>
                        <div style={{display: this.state.current === 1 ? 'block' : 'none'}}>
                            <Form layout='stack-inline' labelWidth={90} className='mt-50' ref={(f) => this.form2 = f}>
                                <FormControl type='label' label='付款账户: ' name='payCount'/>
                                <FormControl type='label' label='收款账户: ' name='receiptCount'/>
                                <FormControl type='label' label='收款人姓名: ' name='receiptName'/>
                                <FormControl type='label' label='转账金额: ' name='amount'/>

                                <div className='cm-menu-item-divider mb-20'></div>

                                <FormControl type='password' label='支付密码: ' name='payPassword' required/>

                                <div className='mt-15' style={{paddingLeft: 90}}>
                                    <Button onClick={this.submit} theme='primary' loading={baseForm.isFething}>提 交</Button>
                                    <Button onClick={this.prev} theme='default' className='ml-15'>上一步</Button>
                                </div>
                            </Form>
                        </div>


                        <div style={{display: this.state.current === 2 ? 'block' : 'none'}}>
                            <div className='mt-50 text-center'>
                                <FontIcon icon='success' font='cmui' className='text-success' style={{fontSize: 50}}></FontIcon>
                                <div className='mt-15'>操作成功</div>
                            </div>
                            <Form style={{background: '#fafafa'}} layout='stack-inline' labelWidth={90} className='mt-50' ref={(f) => this.form3 = f}>
                                <FormControl type='label' label='付款账户: ' name='payCount'/>
                                <FormControl type='label' label='收款账户: ' name='receiptCount'/>
                                <FormControl type='label' label='收款人姓名: ' name='receiptName'/>
                                <FormControl type='label' label='转账金额: ' name='amount'/>
                            </Form>

                            <div className='mt-15' style={{paddingLeft: 90}}>
                                <Button theme='primary' className='ml-15'>查看账单</Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <MessageBox ref={(f) => this.tip = f} title='提示'/>
            </div>
        );
    }
}
export default Comp;
