import React from 'react';

import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Form from 'r-cmui/components/Form';
import Button from 'r-cmui/components/Button';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/Input';
import '../login/login.less';

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        verifyText: '获取验证码',
        count: 60
    }

    counting = false;

    timer = null;

    countDown = () => {
        if (!this.counting) {
            this.counting = true;
            this.setState({
                verifyText: `${this.state.count}s`
            });
            this.timer = window.setInterval(() => {
                const count = this.state.count - 1;
                if (count) {
                    this.setState({
                        count,
                        verifyText: `${count}s`
                    });
                } else {
                    window.clearInterval(this.timer);
                    this.counting = false;
                    this.setState({
                        verifyText: '获取验证码',
                        count: 60
                    });
                }
            }, 1000);
        }
    }

    render () {
        return (
            <div className='login-wrap'>
                <div style={{width: 300, margin: '0 auto', textAlign: 'center'}}>
                    <h3 className='mb-40'>后台管理系统</h3>

                    <Form onSubmit={() => { this.login(); return false; }} labelWidth={80} className='mt-30 login-form' layout='stack-inline' ref={(f) => this.form1 = f}>
                        <Row>
                            <FormControl placeholder='邮箱' type='text' name='email' required rules={{email: true}} messages={{required: '请填写邮件'}}/>
                        </Row>
                        <Row className='mt-10 mb-10'>
                            <FormControl placeholder='密码' type='password' name='password' required messages={{required: '请填写密码'}}/>
                        </Row>
                        <Row className='mt-10 mb-10'>
                            <FormControl placeholder='确认密码' type='password' name='re-password' required messages={{required: '请填写确认密码'}}/>
                        </Row>
                        <Row className='mt-10 mb-10'>
                            <FormControl placeholder='11位手机号' type='integer' name='mobile' required maxLength={11} messages={{required: '请填写手机号码'}}/>
                        </Row>
                        <Row className='mt-10 mb-10'>
                            <Col grid={0.6}>
                                <FormControl placeholder='验证码' type='text' name='verifyCode' maxLength={6} required messages={{required: '请填写验证码'}}/>
                            </Col>
                            <Col grid={0.4} style={{padding: '0 5px 0 10px', fontSize: 14}}>
                                <Button onClick={this.countDown} style={{width: '100%', height: '100%'}} disabled={this.counting}>{this.state.verifyText}</Button>
                            </Col>
                        </Row>
                        <button type='submit' style={{display: 'none'}}></button>
                    </Form>
                    <Row className='mb-10'>
                        <Col grid={0.6}>
                            <Button theme='primary' style={{width: '100%'}} size='large' onClick={this.login}>注 册</Button>
                        </Col>
                        <Col grid={0.4} style={{padding: '4px 5px 0 10px', fontSize: 14}}>
                            <a className='text-link' href='#/login'>使用已有账户登录</a>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}
export default Comp;
