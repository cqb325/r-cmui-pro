import React from 'react';
import Select from 'r-cmui/components/Select';
import Switch from 'r-cmui/components/Switch';
import Button from 'r-cmui/components/Button';
import MessageBox from 'r-cmui/components/MessageBox';
import UUID from 'r-cmui/components/utils/UUID';
import FormControl from 'r-cmui/components/FormControl';

class OrignAddress extends React.Component {
    displayName = 'OrignAddress';

    constructor (props) {
        super(props);

        if (props.value) {
            props.value.forEach((item) => {
                item.id = UUID.v4();
            });
        }

        this.state = {
            data: props.value || [
                {
                    id: UUID.v4(),
                    type: '0',
                    isMain: true
                }
            ]
        };
    }

    type = [
        {id: '0', text: 'IP'},
        {id: '1', text: '域名'}
    ];

    renderLines () {
        const data = this.state.data;
        return data.map((item) => {
            const text = item.isMain ? '设为主站' : '设为备站';
            return <div key={item.id}>
                <Select data={this.type} value={item.type || '0'} style={{width: 75}} minWidth={0} onChange={this.changeType.bind(this, item)}/>
                <FormControl type='text'
                    ref={(ref) => { item.domain = ref; }} 
                    name='domain'
                    className='ml-15'
                    onChange={this.changeDomain.bind(this, item)}
                    required
                    value={item.value}
                    rules={{required: true, ip: true}}></FormControl>
                <Switch className='ml-15' value={item.isMain} size='small' onChange={this.changeIsMain.bind(this, item)}/> <span className='ml-10'>{text}</span>
                <a href='javascript:void(0)' className='ml-25 text-link' onClick={this.removeItem.bind(this, item)}>删除</a>
            </div>;
        });
    }

    check () {
        const data = this.state.data;
        let valid = true;
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            valid = item.domain.check();
            if (!valid) {
                return valid;
            }
        }

        return valid;
    }

    changeType = (item, value) => {
        item.type = value;
        if (value === '1') {
            delete item.domain.rules['ip'];
            item.domain.setRule('domain', true);
            if (item.value) {
                item.domain.check();
            }
        }
        if (value === '0') {
            delete item.domain.rules['domain'];
            item.domain.setRule('ip', true);
            if (item.value) {
                item.domain.check();
            }
        }
    }

    changeDomain = (item, value) => {
        item.value = value;
    }

    changeIsMain = (item, value) => {
        item.isMain = value;

        if (value) {
            const data = this.state.data;
            data.forEach((iter) => {
                if (iter.id !== item.id) {
                    iter.isMain = false;
                }
            });
            this.setState({data});
        }
    }

    removeItem = (item) => {
        const data = this.state.data;
        if (data.length === 1) {
            return false;
        }
        const newData = data.filter((iter) => {
            return iter.id != item.id;
        });
        if (item.isMain) {
            if (newData.length) {
                newData[0].isMain = true;
            }
        }

        this.setState({data: newData});
    }

    add = () => {
        const data = this.state.data;
        const item = {
            id: UUID.v4(),
            type: '0',
            isMain: false
        };
        data.push(item);
        this.setState({data});
    }

    getValue () {
        const data = this.state.data;
        const items = data.map((item) => {
            return {
                type: item.type,
                value: item.value,
                isMain: item.isMain
            };
        });

        return items;
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.value !== this.props.value) {
            nextProps.value.forEach((item) => {
                item.id = UUID.v4();
            });
            this.setState({
                data: nextProps.value
            });
        }
    }

    render () {
        const data = this.state.data;
        return (
            <div className='orign-address'>
                {this.renderLines()}
                <div>
                    {data.length === 10 ? null : <Button icon='plus' theme='primary' onClick={this.add}>添 加</Button>}
                    <span className='text-promote ml-15'>(最多支持10个域名或IP回源地址，支持主备设置)</span>
                </div>

                <MessageBox ref={(f) => this.tip = f} title='提示'></MessageBox>
            </div>
        );
    }
}

FormControl.register(OrignAddress, 'orignAddress', 'array');

export default OrignAddress;
