import React from 'react';

import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import 'r-cmui/components/Select';
import DistrictData from './District';

class NativePlace extends React.Component {
    displayName = 'NativePlace';

    updateCity = (value, item) => {
        this.city.getReference().setData(item.children, '');
    }

    getValue () {
        return this.form.getFormParams();
    }

    checkValid () {
        return this.form.isValid();
    }

    render () {
        return (
            <Form component='div' ref={(f) => this.form = f}>
                <FormControl name='province' type='select' data={DistrictData} minWidth={90} onChange={this.updateCity}></FormControl>
                <FormControl ref={(f) => this.city = f} name='city' type='select' data={[]} minWidth={90} style={{marginLeft: 5}}></FormControl>
            </Form>
        );
    }
}

FormControl.register(NativePlace, 'nativePlace');

export default NativePlace;
