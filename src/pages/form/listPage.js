import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import MessageBox from 'r-cmui/components/MessageBox';
import Dialog from 'r-cmui/components/Dialog';
import Card from 'r-cmui/components/Card';
import fetch from 'r-cmui/components/utils/fetch';
import HostForm from './HostForm';

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';

import { inject, observer } from 'mobx-react';

@inject('listPage')
@observer
class ListPage extends React.Component {
    displayName = 'ListPage';

    serverListURL = window.serverList || 'http://172.18.34.66:8415/mock/cdn-ops/server/list';
    agreeURL = window.agreeURL || 'http://172.18.34.66:8415/mock/ops-portal/success';
    rejectURL = window.rejectURL || 'http://172.18.34.66:8415/mock/ops-portal/success';
    offlineURL = window.offlineURL || 'http://172.18.34.66:8415/mock/ops-portal/success';

    columns = [
        {name: 'name', text: '主机名称'},
        {name: 'IP', text: 'IP'},
        {name: 'role', text: '主机角色'},
        {name: 'parameters', text: '主机参数'},
        {name: 'state', text: '主机状态', format: (value) => {
            return this.stateMap[value];
        }},
        {name: 'op', text: '操作', width: '120px', format: (value, cloumn, row) => {
            return this.getOps(row);
        }}
    ];

    statusData = [
        {id:'TOJOIN', text:'待核验'},
        {id:'NORMAL', text:'正常'},
        {id:'OFFLINE', text:'正常下线'},
        {id:'ACCESSREJECT', text:'拒绝接入'}
    ];

    stateMap = {
        'NORMAL': '正常',
        'TOJOIN': '待核验',
        'OFFLINE': '正常下线',
        'ACCESSREJECT': '拒绝接入'
    };

    getOps (row) {
        if (row.state == 'TOJOIN') {
            return <span>
                <a href='javascript:void(0)' title='查看详情' className='mr-15 text-link'>
                    <i className='fa fa-eye'></i>
                </a>
                <a href='javascript:void(0)' title='接受' className='mr-15 text-success' onClick={this.openAgreeConfirm.bind(this, row.id)}><i className='cmui cmui-success'></i></a>
                <a href='javascript:void(0)' title='拒绝' className='mr-5 text-danger' onClick={this.openRejectConfirm.bind(this, row.id)}><i className='cmui cmui-error'></i></a>
            </span>;
        }
        if (row.state == 'NORMAL') {
            return <span>
                <a href='javascript:void(0)' title='查看详情' className='mr-15 text-link'>
                    <i className='fa fa-eye'></i>
                </a>
                <a href='javascript:void(0)' title='下线' className='mr-5 text-danger' 
                    onClick={this.openOfflineConfirm.bind(this, row.id)}>
                    <i className='fa fa-arrow-circle-o-down'></i>
                </a>
            </span>;
        }
        if (row.state == 'OFFLINE' || row.state == 'ACCESSREJECT') {
            return <span>
                <a href='javascript:void(0)' title='查看详情' className='mr-15 text-link'><i className='fa fa-eye'></i></a>
            </span>;
        }
    }

    openAgreeConfirm (id) {
        this.agree.show('确定接入该主机？');
        this.agree.setData(id);
    }
    openRejectConfirm (id) {
        this.reject.show('确定拒接该主机？');
        this.reject.setData(id);
    }
    openOfflineConfirm (id) {
        this.offline.show('确定下线该主机？');
        this.offline.setData(id);
    }

    agree = async (flag) => {
        const id = this.agree.getData();
        const {listPage} = this.props;
        if (flag) {
            this.agree.showLoading();
            const ret = await listPage.agree(id);
            this.agree.hideLoading();
            if (ret && ret.success) {
                this.tip.show('操作成功');
                this.table.refresh();
            } else {
                this.tip.show('操作失败');
            }
        }
        return true;
    }

    reject = async (flag) => {
        const id = this.reject.getData();
        const {listPage} = this.props;
        if (flag) {
            this.reject.showLoading();
            const ret = await listPage.reject(id);
            this.reject.hideLoading();
            if (ret && ret.success) {
                this.tip.show('操作成功');
                this.table.refresh();
            } else {
                this.tip.show('操作失败');
            }
        }
        return true;
    }

    offline = async (flag) => {
        const id = this.offline.getData();
        const {listPage} = this.props;
        if (flag) {
            this.offline.showLoading();
            const ret = await listPage.offline(id);
            this.offline.hideLoading();
            if (ret && ret.success) {
                this.tip.show('操作成功');
                this.table.refresh();
            } else {
                this.tip.show('操作失败');
            }
        }
        return true;
    }

    openAddDialog = () => {
        this.addDialog.open();
        this.hostForm.resetForm();
    }

    saveHost = (flag) => {
        if (flag) {
            if (this.hostForm.isValid()) {
                this.doSaveHost();
            }
            return false;
        }
        return true;
    }

    async doSaveHost () {
        const {listPage} = this.props;
        const params = this.hostForm.getParams();
        this.addDialog.showLoading();
        const ret = await listPage.saveHost(params);
        this.addDialog.hideLoading();
        if (ret && ret.success) {
            this.tip.show('操作成功');
            this.table.refresh();
            this.addDialog.close();
        } else {
            this.tip.show('操作失败');
        }
    }

    openEdit = async (id) => {
        const {listPage} = this.props;
        const host = await listPage.getHostInfo(id);
    }

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单页</Breadcrumb.Item>
                    <Breadcrumb.Item>列表页</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30'>
                    <Form ref={(f) => this.condition = f}>
                        <FormControl name='name' type='text' label='主机名称（FQDN）'/>
                        <FormControl name='hostRole' type='text' label='主机角色'/>
                        <FormControl name='state' type='select' label='主机状态' data={this.statusData} placeholder='全部' hasEmptyOption='true' choiceText='全部'/>
                        <Button theme='primary' className='ml-20' ref={(f) => this.searchBtn = f}>检 索</Button>
                        <Button theme='primary' className='ml-10' onClick={this.openAddDialog}>新增主机</Button>
                    </Form>

                    <SimpleListPage ref={(f) => this.table = f} pagination columns={this.columns} searchBtn={() => this.searchBtn} condition={() => this.condition} action={this.serverListURL}/>
                </Card>

                <Dialog title='新增主机' ref={(f) => this.addDialog = f} 
                    onConfirm={this.saveHost}
                    content={<HostForm ref={(f) => this.hostForm = f}/>} 
                />
                <MessageBox ref={(f) => this.agree = f} title='提示' type='confirm' confirm={this.agree}></MessageBox>
                <MessageBox ref={(f) => this.reject = f} title='提示' type='confirm' confirm={this.reject}></MessageBox>
                <MessageBox ref={(f) => this.offline = f} title='提示' type='confirm' confirm={this.offline}></MessageBox>
                <MessageBox ref={(f) => this.tip = f} title='提示'></MessageBox>

            </div>
        );
    }
}
export default ListPage;
