import React from 'react';
import FontIcon from 'r-cmui/components/FontIcon';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import Breadcrumb from 'r-cmui/components/Breadcrumb';

class ErrorPage extends React.Component {
    displayName = 'ErrorPage';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>结果页</Breadcrumb.Item>
                    <Breadcrumb.Item>失败页</Breadcrumb.Item>
                </Breadcrumb>

                <div className='text-center' style={{width: '70%', margin: '0 auto', marginTop: 50}}>
                    <FontIcon icon='error' font='cmui' className='text-danger' style={{fontSize: 80, fontWeight: 700}}></FontIcon>
                    <h3 className='mt-10'>操作失败</h3>

                    <div className='mt-15 text-promote'>
                        请核对并修改以下信息后，再重新提交。
                    </div>

                    <Card className='mt-30 text-left'>
                        <div>您提交的内容有如下错误：</div>

                        <div className='mt-20'>
                            <FontIcon font='cmui' icon='close' style={{fontSize: 18}} className='mr-5 text-danger'/>
                            <span>您的账户已被冻结</span>
                            <span className='text-link ml-10'>理解解冻 &gt;</span>
                        </div>
                        <div className='mt-15'>
                            <FontIcon font='cmui' icon='close' style={{fontSize: 18}} className='mr-5 text-danger'/>
                            <span>您的账户还不具备申请资格</span>
                            <span className='text-link ml-10'>立即升级 &gt;</span>
                        </div>

                        <div className='mt-50 text-center'>
                            <Button theme='primary'>返回修改</Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export default ErrorPage;
