import React from 'react';
import UUID from 'r-cmui/components/utils/UUID';
import FormControl from 'r-cmui/components/FormControl';

import 'r-cmui/components/FormControl/Label';

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

    type = {'0': 'IP:','1': '域名:'};

    renderLines () {
        const data = this.state.data;
        return data.map((item) => {
            const text = item.isMain ? '主站' : '备站';
            return <div key={item.id}>
                <FormControl type='label' value={this.type[item.type]} style={{width: 50, textAlign: 'right'}}/>
                <FormControl type='label'
                    name='domain'
                    className='ml-15'
                    style={{width: 100}}
                    value={item.value}></FormControl>
                <span className='ml-10'>{text}</span>
            </div>;
        });
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
        return (
            <div className='orign-address'>
                {this.renderLines()}
            </div>
        );
    }
}

FormControl.register(OrignAddress, 'orignAddressLabel', 'array');

export default OrignAddress;
