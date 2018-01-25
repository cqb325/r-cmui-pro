import React from 'react';

import FontIcon from 'r-cmui/components/FontIcon';
import notification from 'r-cmui/components/Notification';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import Breadcrumb from 'r-cmui/components/Breadcrumb';

class Comp extends React.Component {
    displayName = 'Comp';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>通知</Breadcrumb.Item>
                </Breadcrumb>

                <Card className='mt-30' title='States'>
                    <div className='mb-15'>Notification 可以显示不同类型的通知.</div>
                    <Button theme='primary' onClick={() => {
                        notification.open({
                            title: '提示',
                            desc: '这是一个普通通知'
                        });
                    }}>通知</Button>

                    <Button theme='success' className='ml-10' onClick={() => {
                        notification.success({
                            title: '提示',
                            desc: '成功创建了一个通知'
                        });
                    }}>成功</Button>

                    <Button theme='warning' className='ml-10' onClick={() => {
                        notification.warning({
                            title: '暴雪红色预警',
                            duration: 0,
                            desc: '明天全省出现大暴雪，降雪量将达50cm，尽量不要出行，出行请注意安全！'
                        });
                    }}>预警</Button>

                    <Button theme='danger' className='ml-10' onClick={() => {
                        notification.error({
                            title: '提示',
                            duration: 0,
                            desc: '您访问的地址无法找到'
                        });
                    }}>错误</Button>

                    <Button theme='primary' className='ml-10' onClick={() => {
                        notification.question({
                            title: '提示',
                            duration: 0,
                            key: 'open-fun',
                            desc: '您确认开通改功能?',
                            btn: <Button theme='primary' size='small' onClick={() => {
                                notification.close('open-fun');
                                setTimeout(() => {
                                    notification.success({
                                        title: '提示',
                                        desc: '功能开通成功'
                                    });
                                }, 200);
                            }}>确认</Button>
                        });
                    }}>选择</Button>
                </Card>


                <Card className='mt-30' title='dock'>
                    <div className='mb-15'>Notification 可以在不同位置显示通知,并有不同的主题.</div>
                    <Button theme='primary' onClick={() => {
                        notification.open({
                            title: '提示',
                            theme: 'primary',
                            desc: '这是一个普通通知'
                        });
                    }}>通知</Button>

                    <Button theme='success' className='ml-10' onClick={() => {
                        notification.success({
                            title: '提示',
                            dock: 'bottomRight',
                            theme: 'success',
                            desc: '成功创建了一个通知'
                        });
                    }}>成功</Button>

                    <Button theme='warning' className='ml-10' onClick={() => {
                        notification.warning({
                            title: '暴雪红色预警',
                            duration: 0,
                            dock: 'topLeft',
                            theme: 'warning',
                            desc: '明天全省出现大暴雪，降雪量将达50cm，尽量不要出行，出行请注意安全！'
                        });
                    }}>预警</Button>

                    <Button theme='danger' className='ml-10' onClick={() => {
                        notification.error({
                            title: '提示',
                            duration: 0,
                            theme: 'danger',
                            dock: 'bottomLeft',
                            desc: '您访问的地址无法找到'
                        });
                    }}>错误</Button>
                </Card>
            </div>
        );
    }
}
export default Comp;
