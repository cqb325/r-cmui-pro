import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Button from 'r-cmui/components/Button';
import SimpleListPage from 'r-cmui/components/Business/SimpleListPage';
import MessageBox from 'r-cmui/components/MessageBox';
import Card from 'r-cmui/components/Card';
import fetch from 'r-cmui/components/utils/fetch';

import 'r-cmui/components/Input';
import 'r-cmui/components/Select';


class ListPage extends React.Component {
    displayName = 'ListPage';

    serverListURL = window.serverList || 'http://192.168.105.202:8415/mock/cdn-ops/server/list';
    agreeURL = window.agreeURL || 'http://192.168.105.202:8415/mock/ops-portal/success';
    rejectURL = window.rejectURL || 'http://192.168.105.202:8415/mock/ops-portal/success';
    offlineURL = window.offlineURL || 'http://192.168.105.202:8415/mock/ops-portal/success';

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
                <a href={`./details.html?id=${row.id}`} title='查看详情' className='mr-15 text-link' style={{fontSize: 16}}>
                    <i className='fa fa-eye'></i>
                </a>
                <a href='javascript:void(0)' title='接受' className='mr-15 text-success' onClick={this.openAgreeConfirm.bind(this, row.id)}><i className='cmui cmui-success'></i></a>
                <a href='javascript:void(0)' title='拒绝' className='mr-5 text-danger' onClick={this.openRejectConfirm.bind(this, row.id)}><i className='cmui cmui-error'></i></a>
            </span>;
        }
        if (row.state == 'NORMAL') {
            return <span>
                <a href={`./details.html?id=${row.id}`} title='查看详情' className='mr-15 text-link' style={{fontSize: 16}}>
                    <i className='fa fa-eye'></i>
                </a>
                <a href='javascript:void(0)' title='下线' className='mr-5 text-danger' style={{fontSize: 16}} 
                    onClick={this.openOfflineConfirm.bind(this, row.id)}>
                    <i className='fa fa-arrow-circle-o-down'></i>
                </a>
            </span>;
        }
        if (row.state == 'OFFLINE' || row.state == 'ACCESSREJECT') {
            return <span>
                <a href={`./details.html?id=${row.id}`} title='查看详情' className='mr-15 text-link' style={{fontSize: 16}}><i className='fa fa-eye'></i></a>
            </span>;
        }
    }

    openAgreeConfirm (id) {
        this.refs.agree.show('确定接入该主机？');
        this.refs.agree.setData(id);
    }
    openRejectConfirm (id) {
        this.refs.reject.show('确定拒接该主机？');
        this.refs.reject.setData(id);
    }
    openOfflineConfirm (id) {
        this.refs.offline.show('确定下线该主机？');
        this.refs.offline.setData(id);
    }

    agree = async (flag) => {
        const id = this.refs.agree.getData();
        if (flag) {
            const ret = await fetch(this.agreeURL, {id});
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
        const id = this.refs.reject.getData();
        if (flag) {
            const ret = await fetch(this.rejectURL, {id});
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
        const id = this.refs.offline.getData();
        if (flag) {
            const ret = await fetch(this.offlineURL, {id});
            if (ret && ret.success) {
                this.tip.show('操作成功');
                this.table.refresh();
            } else {
                this.tip.show('操作失败');
            }
        }
        return true;
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
                    </Form>

                    <SimpleListPage ref={(f) => this.table = f} pagination columns={this.columns} searchBtn={() => this.searchBtn} condition={() => this.condition} action={this.serverListURL}/>
                </Card>

                <MessageBox ref='agree' title='提示' type='confirm' confirm={this.agree}></MessageBox>
                <MessageBox ref='reject' title='提示' type='confirm' confirm={this.reject}></MessageBox>
                <MessageBox ref='offline' title='提示' type='confirm' confirm={this.offline}></MessageBox>
                <MessageBox ref={(f) => this.tip = f} title='提示'></MessageBox>

            </div>
        );
    }
}
export default ListPage;
