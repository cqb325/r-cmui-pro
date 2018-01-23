import React from 'react';
import FontIcon from 'r-cmui/components/FontIcon';
import Card from 'r-cmui/components/Card';
import Steps from 'r-cmui/components/Steps';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Button from 'r-cmui/components/Button';
import Breadcrumb from 'r-cmui/components/Breadcrumb';

class Success extends React.Component {
    displayName = 'Success';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>结果页</Breadcrumb.Item>
                    <Breadcrumb.Item>成功页</Breadcrumb.Item>
                </Breadcrumb>
                <div className='text-center' style={{width: '70%', margin: '0 auto', marginTop: 50}}>
                    <FontIcon icon='success' font='cmui' className='text-success' style={{fontSize: 80, fontWeight: 700}}></FontIcon>
                    <h3 className='mt-10'>操作成功</h3>

                    <div className='mt-15 text-promote'>
                    提交结果页用于反馈一系列操作任务的处理结果， 如果仅是简单操作，使用 Message 全局提示反馈即可。 本文字区域可以展示简单的补充说明，如果有类似展示 “单据”的需求，下面这个灰色区域可以呈现比较复杂的内容。
                    </div>

                    <Card className='mt-30 text-left'>
                        <div>项目名称</div>

                        <Row className='mt-15'>
                            <Col grid={.5}>
                                <label>项目 ID：</label><span>123456</span>
                            </Col>
                            <Col grid={.5}>
                                <label>负责人：</label><span>张三</span>
                            </Col>
                            <Col grid={.5}>
                                <label>立项时间：</label><span>2018-01-01 12:00</span>
                            </Col>
                        </Row>
                        <div className='mt-15'>
                            <Steps size='small' current={1}>
                                <Steps.Step title='创建项目' description={
                                    <div>
                                        <div>张三</div>
                                        <div>2018-01-01 12:00</div>
                                    </div>
                                }></Steps.Step>
                                <Steps.Step title='部门初审'  description={
                                    <div>
                                        <div>李四</div>
                                        <div>2018-01-02 12:00</div>
                                    </div>
                                }></Steps.Step>
                                <Steps.Step title='财务复核'></Steps.Step>
                                <Steps.Step title='完成'></Steps.Step>
                            </Steps>
                        </div>

                        <div className='mt-50 text-center'>
                            <Button theme='primary' className='mr-10'>返回列表</Button>
                            <Button className='ml-10 mr-10'>查看项目</Button>
                            <Button className='ml-10'>打印</Button>
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Success;
