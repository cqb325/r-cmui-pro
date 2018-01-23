import React from 'react';
import Card from 'r-cmui/components/Card';
import FontIcon from 'r-cmui/components/FontIcon';
import Steps from 'r-cmui/components/Steps';
import Button from 'r-cmui/components/Button';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';

import { inject, observer } from 'mobx-react';

@inject('auth')
@observer
class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        current: 0
    }

    componentWillMount () {
        this.props.auth.getVerifyCode();
    }

    checkAccount = async () => {
        if (this.form1.isValid()) {
            const params = this.form1.getFormParams();
            const ret = await this.props.auth.checkAccount(params);
            if (ret && ret.success) {
                this.next();
            }
        }
    }

    next () {
        this.setState({
            current: this.state.current + 1
        });
    }

    prev = () => {
        this.setState({
            current: this.state.current - 1
        });
    }

    changeVerify = () => {
        this.props.auth.getVerifyCode();
    }

    changePassword = async () => {
        if (this.form2.isValid()) {
            const params = this.form2.getFormParams();
            const ret = await this.props.auth.changePassword(params);
            if (ret && ret.success) {
                this.next();
            }
        }
    }
    
    render () {
        return (
            <div className='login-wrap'>
                <div style={{width: 500, margin: '0 auto'}}>
                    <h3 className='mb-40' style={{textAlign: 'center'}}><FontIcon icon='lock'/> 找回密码</h3>
                    <Card>
                        <Steps ref={(f) => this.steps = f} current={this.state.current}>
                            <Steps.Step title='账号验证'></Steps.Step>
                            <Steps.Step title='重置密码'></Steps.Step>
                            <Steps.Step title='完成'></Steps.Step>
                        </Steps>

                        <Form ref={(f) => this.form1 = f} className='mt-30' labelWidth={90} style={{display: this.state.current === 0 ? 'block' : 'none'}}>
                            <div style={{paddingLeft: 90, color: 'red', marginBottom: 5}}>{this.props.auth.findError}</div>
                            <FormControl name='username' type='text' label='账号/手机号' required size='large'/>
                            <div>
                                <FormControl name='captcha' type='text' label='验证码' required maxLength={4} size='large'/>
                                <Button style={{padding: 0, top: -2}} onClick={this.changeVerify}>&nbsp;<span style={{display: 'inline-block',verticalAlign: 'middle'}} dangerouslySetInnerHTML={{__html: this.props.auth.verifyCode}}></span></Button>
                            </div>
                            <div>
                                <span style={{paddingLeft: 90}}></span>
                                <Button theme='primary' size='large' onClick={this.checkAccount}>下一步</Button>
                            </div>
                        </Form>

                        <Form ref={(f) => this.form2 = f} className='mt-30' labelWidth={90} style={{display: this.state.current === 1 ? 'block' : 'none'}}>
                            <div style={{paddingLeft: 90, color: 'red', marginBottom: 5}}>{this.props.auth.changePasswordError}</div>
                            <FormControl name='userId' type='hidden' required value={this.props.auth.accountId}/>
                            <FormControl name='oldPassword' type='password' label='旧密码' required size='large'/>
                            <FormControl name='newPassword' type='password' label='新密码' required size='large'/>
                            <FormControl name='reNewPassword' type='password' label='确认新密码' required size='large'/>
                            <div>
                                <span style={{paddingLeft: 90}}></span>
                                <Button loading={this.props.auth.isFetching} theme='primary' size='large' onClick={this.changePassword}>下一步</Button>
                                <Button className='ml-10' size='large' onClick={this.prev}>上一步</Button>
                            </div>
                        </Form>

                        <div className='mt-30' style={{display: this.state.current === 2 ? 'block' : 'none'}}>
                            <div className='mt-50 text-center'>
                                <FontIcon icon='success' font='cmui' className='text-success' style={{fontSize: 50}}></FontIcon>
                                <h3 className='mt-30'>密码修改成功</h3>

                                <Button className='mt-15' theme='primary' size='large' href='#/login'>返回登录</Button>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Comp;
