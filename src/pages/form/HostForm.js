import React from 'react';
import Form from 'r-cmui/components/Form';
import Row from 'r-cmui/components/Row';
import FormControl from 'r-cmui/components/FormControl';

class Comp extends React.Component {
    displayName = 'Comp';

    roles = [
        {id: '1', text: 'role1'},
        {id: '2', text: 'role2'},
        {id: '3', text: 'role3'},
        {id: '4', text: 'role4'},
        {id: '5', text: 'role5'}
    ];

    isValid () {
        return this.form.isValid();
    }

    getParams () {
        return this.form.getFormParams();
    }

    resetForm () {
        this.form.reset();
    }

    render () {
        return (
            <div style={{width: 400}}>
                <Form layout='stack-inline' labelWidth={80} ref={(f) => this.form = f}>
                    <FormControl name='name' label='主机名称' type='text' required maxLength={32} rules={{required: true, userName: true}}/>
                    <FormControl name='role' label='主机角色' type='select' required data={this.roles}/>
                    <FormControl name='ip' label='IP地址' type='text' required rules={{ip: true}} messages={{ip: '请输入正确的IP地址'}}/>
                    <Row>
                        <span className='pull-left' style={{width: 350}}>
                            <FormControl name='outWidth' type='integer' label='出口带宽' required/>
                        </span>
                        <span className='pull-left'>Gb/s</span>
                    </Row>
                    <Row>
                        <span className='pull-left' style={{width: 350}}>
                            <FormControl name='inWidth' type='integer' label='入口带宽' required/>
                        </span>
                        <span className='pull-left'>Gb/s</span>
                    </Row>
                </Form>
            </div>
        );
    }
}
export default Comp;
