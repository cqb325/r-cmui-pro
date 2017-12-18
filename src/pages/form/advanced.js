import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Row from 'r-cmui/components/Row';
import Button from 'r-cmui/components/Button';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import MessageBox from 'r-cmui/components/MessageBox';
import fetch from 'r-cmui/components/utils/fetch';

import '../../components/DomainForm/Domains';
import '../../components/DomainForm/OrignAddress';
import '../../components/DomainForm/Advanced';

import './styles.less';

const domainREG = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/;

window.Validation.addMethod('domain', (value) => {
    return domainREG.test(value);
}, '填写正确的域名');

class Advanced extends React.Component {
    displayName = 'Advanced';

    saveURL = window.saveURL || 'http://192.168.105.202:8415/mock/ops-portal/success';

    state = {
        advanced: false
    };

    openCloseAdvanced = (value) => {
        this.setState({
            advanced: value
        });
    }

    renderAdvanced () {
        const display = this.state.advanced ? 'block' : 'none';
        return (
            <Row style={{display, paddingLeft: 80}}>
                <FormControl ref={(f) => this.advancedControl = f} label='' type='advanced' name='advancedData'></FormControl>
            </Row>
        );
    }

    saveAll = async () => {
        const domainsValid = this.domains.getReference().isValid();
        if (!domainsValid) {
            return false;
        }
        const domains = this.domains.getValue();
        let params;
        if (this.form.isValid()) {
            if (this.state.advanced) {
                const advancedValid = this.advancedControl.getReference().isValid();
                if (advancedValid) {
                    params = this.form.getFormParams();
                    params.advanced = this.state.advanced;

                    const advancedData = params.advancedData;
                    delete params.advancedData;
                    Object.assign(params, advancedData);
                }
            } else {
                params = this.form.getFormParams();
                delete params.advancedData;
                params.advanced = this.state.advanced;
            }

            if (params) {
                const data = domains.map((domain) => {
                    const param = {domain};
                    Object.assign(param, params);
                    return param;
                });

                console.log(data);
                const ret = await fetch(this.saveURL, data, 'post');
                if (ret && ret.success) {
                    this.refs.tip.show('保存成功');
                } else {
                    this.refs.tip.show('保存失败');
                }
            }
        }
    }

    render () {
        window.Validation.addMethod('complete', () => {
            return this.refs.orignAddress.getReference().check();
        }, '');
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单页</Breadcrumb.Item>
                    <Breadcrumb.Item>高级表单</Breadcrumb.Item>
                </Breadcrumb>

                <Form ref={(f) => this.form = f} action='xxx' ajax labelWidth={80} className='mt-30'>
                    <FormControl label='加速域名' ref={(f) => this.domains = f} name='domains' type='domains' className='large-control'/>
                    <div>
                        <FormControl className='large-control' label='源站地址' ref='orignAddress' type='orignAddress' name='loopDomain' rules={{complete: true}}></FormControl>
                    </div>
                    <FormControl label='端口设置' type='integer' name='port' rules={{required: true, min: 1, max: 65535}} value='80'></FormControl>
                    <Form.Promote className='mb-10'>请填写端口信息，默认建议为80端口，端口号需 大于0小于等于65535</Form.Promote>
                    <FormControl label='高级设置' checkedText='开启' unCheckedText='关闭' type='switch' name='advanced' value={this.state.advanced} onChange={this.openCloseAdvanced}></FormControl>
                    {this.renderAdvanced()}
                </Form>

                <div className='text-center mt-40'>
                    <Button className='mr-15' theme='primary' onClick={this.saveAll}>提 交</Button>
                    <Button className='ml-15'>取 消</Button>
                </div>

                <MessageBox ref='tip' title='提示'/>
            </div>
        );
    }
}
export default Advanced;
