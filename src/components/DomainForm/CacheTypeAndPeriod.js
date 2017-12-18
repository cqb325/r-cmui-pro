import React from 'react';
import TableForm from 'r-cmui/components/Business/TableForm';
import Button from 'r-cmui/components/Button';
import UUID from 'r-cmui/components/utils/UUID';

import './Period';

window.Validation.addMethod('period', (value) => {
    return !!(`${value.period}`).trim();
}, '填写过期时间');

window.Validation.addMethod('dir', (value, type) => {
    if (type === 'dir') {
        if (value.substr(0,1) !== '/') {
            return false;
        }
    }
    if (type === 'ext') {
        if (!/[a-zA-Z,]+/.test(value)) {
            return false;
        }
        const exts = value.split(',');
        let valid = true;
        exts.forEach((ext) => {
            if (!ext) {
                valid = false;
            }
        });
        return valid;
    }
    return true;
}, '填写正确的目录或文件后缀');

class CacheTypeAndPeriod extends React.Component {
    displayName = 'CacheTypeAndPeriod';
    
    type = [
        {id: 'dir', text: '目录'},
        {id: 'ext', text: '文件后缀名'}
    ];

    columns = [
        {name: 'type', text: '类型', type: 'select', props: {data: this.type, style: {width: 80}, minWidth: 80}, defaultValue: 'dir'},
        {name: 'content', text: '内容', type: 'text', props: {required: true}, rules: {dir: true}},
        {name: 'period', text: '过期时间', type: 'period', props: {required: true}, rules: {period: true}},
        {name: 'op', text: '', format: (value, column, row) => {
            return <a className='text-link' href='javascript:void(0)' onClick={this.removeRow.bind(this, row)}>删除</a>;
        }}
    ];

    onFormChange = (name, value, column, items) => {
        if (name === 'content') {
            const type = items['type'].getValue();
            items[name].setRule('dir', type);
            items[name].check();
        }
        if (name === 'type') {
            const content = items['content'].getValue();
            items['content'].setRule('dir', value);
            if (content) {
                items['content'].check();
            }
        }
    }

    removeRow (row) {
        this.refs.tableForm.removeRowById(row.id);
    }

    addRow = () => {
        this.refs.tableForm.addRow();
    }

    isValid () {
        return this.refs.tableForm.isValid();
    }

    getValue () {
        let params = this.refs.tableForm.getData();
        params = params.map((item) => {
            const period = item.period;
            delete item.period;
            Object.assign(item, period);
            return item;
        });
        return params;
    }

    addInitData (data) {
        if (data) {
            data.forEach((item) => {
                item.id = UUID.v4();
                item.period = {
                    period: item.period,
                    unit: item.unit
                };
                this.refs.tableForm.addRow(item);
            });
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data !== this.props.data) {
            this.addInitData(nextProps.data);
        }
    }

    render () {
        return (
            <div style={{background: '#fff'}}>
                <TableForm ref='tableForm' columns={this.columns} bordered onChange={this.onFormChange}></TableForm>
                <div className='mt-10 mb-10 ml-5'>
                    <Button icon='plus' theme='primary' onClick={this.addRow}>添 加</Button>
                </div>
            </div>
        );
    }
}

// FormControl.register(CacheTypeAndPeriod, 'cacheType');

export default CacheTypeAndPeriod;
