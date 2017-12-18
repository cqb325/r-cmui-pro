import React from 'react';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';


class SecondCheck extends React.Component {
    displayName = 'SecondCheck';

    getValue = () => {
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
            }
        }
    }

    render () {
        const domainREG = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;
        const IPREG = /((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))/;

        window.Validation.addMethod('domainOrIp', (value) => {
            if (domainREG.test(value) || IPREG.test(value)) {
                return true;
            }
            return false;
        }, '填写正确的域名或IP');

        return (
            <div style={{width: 353, marginBottom: 15}}>
                <Form ref='form' component='div' labelWidth={138}>
                    <FormControl name='address' label='认证服务器地址或IP' type='text' required rules={{domainOrIp: true}} />
                </Form>
            </div>
        );
    }
}
export default SecondCheck;
