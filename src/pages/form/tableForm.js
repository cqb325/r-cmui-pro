import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import TableForm from 'r-cmui/components/Business/TableForm';

import 'r-cmui/components/Input';
import 'r-cmui/components/RadioGroup';
import './NativePlace';

import { inject, observer } from 'mobx-react';

@inject('routing')
@observer
class Comp extends React.Component {
    displayName = 'Comp';

    sexData = [
        {id: '1', text: '男'},
        {id: '0', text: '女'}
    ];
    columns = [
        {name: 'name', text: '姓名', type: 'text', rules: {required: true}},
        {name: 'sex', text: '性别', type: 'radio', props: {data: this.sexData, stick: true}, rules: {required: true}},
        {name: 'age', text: '年龄', type: 'integer', rules: {required: true}},
        {name: 'nativePlace', text: '籍贯', type: 'nativePlace', rules: {required: true}},
        {name: 'op', text: '操作', format: (value, column, row) => {
            return <span><a className='text-danger' title='删除' onClick={this.removeRow.bind(this, row.id)}><i className='fa fa-trash'></i></a></span>;
        }}
    ];

    addRow = () => {
        this.tableForm.addRow();
    }

    removeRow (id) {
        this.tableForm.removeRowById(id);
    }

    save = () => {
        if (this.tableForm.isValid()) {
            const data = this.tableForm.getData();
            console.log(data);
            const {push} = this.props.routing;
            push('/form/tableFormSuccess');
        }
    }

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单</Breadcrumb.Item>
                    <Breadcrumb.Item>表格表单</Breadcrumb.Item>
                </Breadcrumb>

                <Card title='添加成员' className='mt-30'>
                    <TableForm columns={this.columns} ref={(f) => this.tableForm = f}/>
                    <Button style={{width: '100%', textAlign: 'center'}} size='large' theme='primary' onClick={this.addRow}>添加成员</Button>
                </Card>

                <div className='mt-30 text-center'>
                    <Button theme='primary' onClick={this.save}>保 存</Button>
                </div>
            </div>
        );
    }
}
export default Comp;
