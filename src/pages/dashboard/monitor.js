import React from 'react';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import Card from 'r-cmui/components/Card';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';

import MarkPointMap from '../../components/charts/MarkPointMap';

class Monitor extends React.Component {
    displayName = 'Monitor';

    render () {
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item>监控页</Breadcrumb.Item>
                </Breadcrumb>

                <Row className='mt-30' gutter={15}>
                    <Col grid={3 / 4}>
                        <Card title='活动实时交易情况'>
                            <MarkPointMap></MarkPointMap>
                        </Card>
                    </Col>
                    <Col grid={1 / 4}>
                        <Card title='活动情况预测'>

                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Monitor;
