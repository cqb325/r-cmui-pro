import React from 'react';
import TableForm from 'r-cmui/components/Business/TableForm';
import Button from 'r-cmui/components/Button';
import UUID from 'r-cmui/components/utils/UUID';

class DomainShare extends React.Component {
    displayName = 'DomainShare';
    
    columns = [
        {name: 'domain', text: '主域名', type: 'text', props: {required: true}, rules: {domain: true}},
        {name: 'shareDomain', text: '共享域名', type: 'text', props: {required: true}, rules: {domain: true}},
        {name: 'op', text: '', format: (value, column, row) => {
            return <a className='text-link' href='javascript:void(0)' onClick={this.removeRow.bind(this, row)}>删除</a>;
        }}
    ];

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
        return this.refs.tableForm.getData();
    }

    addInitData (data) {
        if (data) {
            data.forEach((item) => {
                item.id = UUID.v4();
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
                <TableForm ref='tableForm' columns={this.columns} bordered></TableForm>
                <div className='mt-10 mb-10 ml-10'>
                    <Button icon='plus' theme='primary' onClick={this.addRow}>添 加</Button>
                </div>
            </div>
        );
    }
}


export default DomainShare;
