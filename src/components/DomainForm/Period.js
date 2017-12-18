import React from 'react';
import Input from 'r-cmui/components/Input';
import Select from 'r-cmui/components/Select';
import FormControl from 'r-cmui/components/FormControl';

class Period extends React.Component {
    displayName = 'Period';

    unit = [
        {id: 'second', text: '秒'},
        {id: 'minute', text: '分'},
        {id: 'hour', text: '小时'},
        {id: 'day', text: '天'},
        {id: 'month', text: '月'}
    ];

    getValue () {
        return {
            period: this.refs.period.getValue(),
            unit: this.refs.unit.getValue()
        };
    }

    onChange = (value) => {
        const val = {
            period: value,
            unit: this.refs.unit.getValue()
        };

        if (this.props.onChange) {
            this.props.onChange(val);
        }
    }

    render () {
        const val = this.props.value;
        return (
            <span className='period-control'>
                <Input value={val ? val.period : ''} ref='period' type='integer' required className='mr-5' style={{width: 80}} onChange={ this.onChange }/>
                <Select value={val ? val.unit : this.unit[2].id} ref='unit' data={this.unit} style={{width: 60}} minWidth={0}></Select>
            </span>
        );
    }
}

FormControl.register(Period, 'period');

export default Period;
