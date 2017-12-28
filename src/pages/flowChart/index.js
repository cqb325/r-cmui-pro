import React from 'react';
import FlowChart from './flowChart';
import fetch from 'r-cmui/components/utils/fetch';
import Dialog from 'r-cmui/components/Dialog';
import Button from 'r-cmui/components/Button';

import {List} from 'immutable';

class Comp extends React.Component {
    displayName = 'Comp';

    state = {
        data: null
    };

    componentWillMount () {
        this.getData();
    }

    async getData () {
        const data = await fetch('http://172.18.34.66:8415/mock/flow/getFlowData');
        this.setState({
            data: [
                [{id: '1', name: '一级', items: ['21','22', '23','24']}],
                [
                    {id: '21', name: '二级1', items: ['23', '24']},
                    {id: '22', name: '二级2', items: ['33', '40']},
                    {id: '23', name: '二级3', items: ['24']},
                    {id: '24', name: '二级4'}
                ],
                [
                    {id: '31', name: '三级1'},
                    {id: '32', name: '三级2'},
                    {id: '33', name: '三级3'},
                    {id: '34', name: '三级4'},
                    {id: '39', name: '三级9'},
                    {id: '40', name: '三级10'}
                ]
            ]
        });
    }

    openEditDialog = () => {
        this.dialog.open();
    }

    addNode = () => {
        const data = List(this.state.data);
        if (data && data.size > 0) {
            data.get(0).push({
                id: `asd:${Math.random()}`,
                name: Math.random()
            });
        }

        this.setState({data: data.toJS()});
    }

    onDelete = (node) => {
        console.log(node.id);
        // todo 确认前后置关系已经取消掉
        const data = List(this.state.data);
        data.forEach((item) => {
            const i = item.indexOf(node);
            if (i > -1) {
                item.splice(i, 1);
            }
            if (item.items) {
                const childIndex = item.items.indexOf(node.id);
                if (childIndex > 0) {
                    item.items.splice(childIndex, 1);
                }
            }
        });
        this.setState({data: data.toJS()});
        // this.flowChart.removeNode(node);
    }

    render () {
        return (
            <div style={{width: '100%', height: '100%'}}>
                <div>
                    <Button onClick={this.addNode}>添加节点</Button>
                </div>
                {this.state.data ? <FlowChart 
                    ref={(f) => this.flowChart = f} 
                    data={this.state.data} 
                    onEdit={this.openEditDialog}
                    onDelete={this.onDelete}
                /> : null}
                <Dialog ref={(f) => this.dialog = f} title='编辑节点'/>
            </div>
        );
    }
}
export default Comp;
