import React from 'react';
import Button from 'r-cmui/components/Button';

import Image from '../../images/404.png';

class Comp extends React.Component {
    displayName = 'Comp';

    render () {
        return (
            <div>
                <div style={{textAlign: 'center', position: 'absolute', top: '50%', left: '50%', marginTop: -142, marginLeft: -206, userSelect: 'none'}}>
                    <img src={Image}/>
                    <div style={{position: 'absolute', top: '50%', paddingLeft: 20}}>
                        <div>您访问的页面不存在</div>
                        <div className='mt-15'><Button href='#/dashboard/analysis'>返回首页</Button></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Comp;
