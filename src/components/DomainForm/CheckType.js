import React from 'react';
import Select from 'r-cmui/components/Select';
import FormControl from 'r-cmui/components/FormControl';
import LocalCheck from './LocalCheck';
import SecondCheck from './SecondCheck';

class CheckType extends React.Component {
    displayName = 'CheckType';

    state = {
        type: '0'
    };

    checkType = [
        {text: '本地认证', id: '0'},
        {text: '二次认证', id: '1'}
    ];

    getValue () {
        const type  = this.state.type;
        let params;
        if (type === '0') {
            params = this.refs.lockCheck.getValue() || '';
            if (params) {
                params.method = '本地认证';
            }
        }
        if (type === '1') {
            params = this.refs.secondCheck.getValue() || '';
            if (params) {
                params.method = '二次认证';
            }
        }
        return params;
    }

    onChange = (value) => {
        this.setState({
            type: value
        });
    }

    isValid () {
        const type  = this.state.type;
        if (type === '0') {
            return this.refs.lockCheck.isValid();
        }
        if (type === '1') {
            return this.refs.secondCheck.isValid();
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                type: nextProps.data.method
            });
            this.refs.select.setValue(nextProps.data.method);
        }
    }

    render () {
        const data = this.props.data;
        return (
            <div>
                <div className='mb-15'>
                    <span className='cm-label cm-form-label' style={{width: 138}}>选择防盗链方式</span>
                    <Select value={`${this.state.type}`} data={this.checkType} placeholder='选择认证方式' ref='select' onChange={this.onChange}/>
                </div>
                <div style={{display: this.state.type === '0' ? 'block' : 'none'}}>
                    <LocalCheck ref='lockCheck' data={data}/>
                </div>
                <div style={{display: this.state.type === '1' ? 'block' : 'none'}}>
                    <SecondCheck ref='secondCheck' data={data}/>
                </div>
            </div>
        );
    }
}

FormControl.register(CheckType, ['checkType']);

export default CheckType;
