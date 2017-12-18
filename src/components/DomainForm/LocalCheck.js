import React from 'react';
import ReactDOM from 'react-dom';
import Form from 'r-cmui/components/Form';
import Row from 'r-cmui/components/Row';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/TextArea';

class LocalCheck extends React.Component {
    displayName = 'LocalCheck';

    encrypt = {
        'AES128': ['ECB']
    };

    switch = [
        {text: '开启', id: '1'},
        {text: '关闭', id: '0'}
    ];

    closeDialog = () => {
        this.props.closeDialog();
    }

    changeEncrypt = (value) => {
        const modes = this.encrypt[value];
        const itemControl = this.refs.encryptMode;
        
        const ele = ReactDOM.findDOMNode(itemControl);
        if (modes) {
            itemControl.getReference().setData(modes, '');
            ele.style.display = 'block';
        } else {
            ele.style.display = 'none';
            itemControl.getReference().setData([], '');
        }
    }

    getValue () {
        const form = this.refs.form;
        if (form.isValid()) {
            const params = form.getFormParams();
            return params;
        }
        return null;
    }

    isValid () {
        const form = this.refs.form;
        return form.isValid();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data !== this.props.data) {
            window.setTimeout(() => {
                this.initFormData(nextProps.data);
            },0);
        }
    }

    initFormData (data) {
        const form = this.refs.form;
        const items = form.getItems();
        for (const key in data) {
            if (items[key]) {
                const value = `${data[key]}`;
                items[key].ref.setValue(value);

                if (key === 'algorithm') {
                    this.changeEncrypt(value);
                }
            }
        }
    }

    render () {
        return (
            <div style={{width: 353}}>
                <Form ref='form' component='div' labelWidth={138}>
                    <Row>
                        <FormControl name='algorithm' label='加密算法' type='select' data={['AES128','MD5']} required onChange={this.changeEncrypt}/>
                    </Row>
                    <Row>
                        <FormControl ref='encryptMode' name='pattern' label='加密模式' type='select' data={[]} required/>
                    </Row>
                    <Row>
                        <FormControl name='secretKey' label='秘钥' type='textarea' height={100} required/>
                    </Row>
                    <Row>
                        <FormControl name='period' label='单次认证有效期' type='integer' required itemStyle={{width: 100}}/>
                        <span>小时</span>
                    </Row>
                    <Row>
                        <FormControl name='clientIP' label='有效IP' type='select' value='1' data={this.switch} required/>
                    </Row>
                </Form>
            </div>
        );
    }
}

export default LocalCheck;
