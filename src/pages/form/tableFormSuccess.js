import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import FontIcon from 'r-cmui/components/FontIcon';

class Comp extends React.Component {
    displayName = 'Comp';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>表单</Breadcrumb.Item>
                    <Breadcrumb.Item>表格表单</Breadcrumb.Item>
                    <Breadcrumb.Item>结果</Breadcrumb.Item>
                </Breadcrumb>

                <div className='mt-50 text-center'>
                    <FontIcon icon='success' font='cmui' className='text-success' style={{fontSize: 50}}></FontIcon>
                    <div className='mt-30'>操作成功</div>
                </div>
            </div>
        );
    }
}
export default Comp;
