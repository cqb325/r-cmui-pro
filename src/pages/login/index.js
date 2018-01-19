import React from 'react';
import Tab from 'r-cmui/components/Tab';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import CheckBox from 'r-cmui/components/CheckBox';
import Form from 'r-cmui/components/Form';
import Button from 'r-cmui/components/Button';
import FontIcon from 'r-cmui/components/FontIcon';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/Input';
import './login.less';

import { inject, observer } from 'mobx-react';

@inject('routing')
@inject('auth')
@observer
class Login extends React.Component {
    displayName = 'Login';

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

    login = () => {
        const key = this.tab.getActiveKey();
        if (key === 'userpsw') {
            if (this.form1.isValid()) {
                const params = this.form1.getFormParams();
                this.doLogin(params);
            }
        } else {
            if (this.form2.isValid()) {
                const params = this.form2.getFormParams();
                this.doLogin(params);
            }
        }
    }

    doLogin = async (params) => {
        if (this.remember.isChecked()) {
            const key = this.tab.getActiveKey();
            if (key === 'userpsw') {
                localStorage.setItem('cmui-login-username', params.username);
            } else {
                localStorage.setItem('cmui-login-mobile', params.mobile);
            }
        }

        await this.props.auth.login(params);
    }

    render () {
        const mobile = localStorage.getItem('cmui-login-mobile');
        const username = localStorage.getItem('cmui-login-username');
        return (
            <div className='login-wrap'>
                <div style={{width: 300, margin: '0 auto', textAlign: 'center'}}>
                    <h3 className='mb-40'>后台管理系统</h3>

                    <Tab ref={(f) => this.tab = f}>
                        <Tab.Item title='账户密码登录' key='userpsw'>
                            <Form onSubmit={() => { this.login(); return false; }} labelWidth={80} className='mt-30 login-form' layout='stack-inline' ref={(f) => this.form1 = f}>
                                <Row>
                                    <FormControl size='large' prefix={<FontIcon icon='user'/>} placeholder='用户名' value={username} type='text' name='username' required rules={{userName: true}} messages={{required: '请填写用户名'}}/>
                                </Row>
                                <Row className='mt-10 mb-10'>
                                    <FormControl size='large' prefix={<FontIcon icon='envelope-o'/>} placeholder='密码' type='password' name='password' required messages={{required: '请填写密码'}}/>
                                </Row>
                                <button type='submit' style={{display: 'none'}}></button>
                            </Form>
                        </Tab.Item>
                        <Tab.Item title='手机号登录' key='phone'>
                            <Form labelWidth={80} className='mt-30 login-form' layout='stack-inline' ref={(f) => this.form2 = f}>
                                <Row>
                                    <FormControl size='large' prefix={<FontIcon icon='mobile'/>} placeholder='手机号' value={mobile} type='integer' name='mobile' maxLength={11} required rules={{mobile: true}} messages={{required: '请填写手机号'}}/>
                                </Row>
                                <Row className='mt-10 mb-10'>
                                    <FormControl size='large' 
                                        prefix={<FontIcon icon='envelope-o'/>}
                                        suffix={<Button theme='primary' onClick={this.countDown} style={{width: 100}}>{this.state.verifyText}</Button>}
                                        placeholder='验证码' type='text'
                                        name='verifyCode' maxLength={6} required
                                        messages={{required: '请填写验证码'}}/>
                                </Row>
                            </Form>
                        </Tab.Item>
                    </Tab>
                    <Row>
                        <span className='pull-left'>
                            <CheckBox label='记住用户名' checked ref={(f) => this.remember = f}/>
                        </span>
                        <span className='pull-right'>
                            <a className='text-link'>忘记密码?</a>
                        </span>
                    </Row>
                    <Row>
                        <Button loading={this.props.auth.isFetching} theme='primary' style={{width: '100%'}} className='mt-20' size='large' onClick={this.login}>登 录</Button>
                    </Row>
                    <Row className='mt-20'>
                        <span className='pull-right'>
                            <a className='text-link' href='#/register'>注册账户</a>
                        </span>
                    </Row>
                </div>
            </div>
        );
    }
}
export default Login;
