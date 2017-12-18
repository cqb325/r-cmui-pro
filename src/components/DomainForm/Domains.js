import React from 'react';
import Button from 'r-cmui/components/Button';
import FormControl from 'r-cmui/components/FormControl';
import UUID from 'r-cmui/components/utils/UUID';

import 'r-cmui/components/Input';

class Domains extends React.Component {
    displayName = 'Domains';

    state = {
        domains: [{
            id: UUID.v4()
        }]
    };

    max = 5;

    renderDomains () {
        const domains = this.state.domains;
        return domains.map((item) => {
            return <div key={item.id}>
                <FormControl ref={(f) => { item.ref = f ; }} onChange={this.onChange.bind(this, item)} label='' placeholder='请输入要加速的域名信息,如www.test.com' itemStyle={{width: 270}} type='text' name='domain' rules={{required: true, domain: true}}></FormControl>
                <a href='javascript:void(0)' className='ml-15 text-link' onClick={this.remove.bind(this, item)}>删除</a>
            </div>;
        });
    }

    add = () => {
        const domains = this.state.domains;
        domains.push({
            id: UUID.v4()
        });
        this.setState(domains);
    }

    remove = (item) => {
        let domains = this.state.domains;
        if (domains.length === 1) {
            return false;
        }
        domains = domains.filter((iter) => {
            return iter.id !== item.id;
        });

        this.setState({domains});
    }

    onChange (item, value) {
        item.value = value;
    }

    getValue () {
        const domains = this.state.domains;
        return domains.map((item) => {
            return item.value;
        });
    }

    isValid () {
        const domains = this.state.domains;
        for (let i = 0; i < domains.length; i++) {
            const ret = domains[i].ref.check();
            if (!ret) {
                return false;
            }
        }
        return true;
    }

    render () {
        const domains = this.state.domains;
        return (
            <span>
                {this.renderDomains()}
                <div>
                    {domains.length === this.max ? null : <Button theme='primary' icon='plus' onClick={this.add}>添 加</Button>}
                </div>
            </span>
        );
    }
}

FormControl.register(Domains, 'domains', 'array');

export default Domains;
