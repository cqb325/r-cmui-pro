import React from 'react';
import ReactDOM from 'react-dom';
import Row from 'r-cmui/components/Row';
import Col from 'r-cmui/components/Col';
import Card from 'r-cmui/components/Card';
import Button from 'r-cmui/components/Button';
import MarkPointMap from '../../components/charts/MarkPointMap';
import Breadcrumb from 'r-cmui/components/Breadcrumb';
import html2canvas from '../../lib/html2canvas';
import Dialog from 'r-cmui/components/Dialog';

console.log(html2canvas);

import { inject, observer } from 'mobx-react';

@inject('dashboard')
@observer
class Comp extends React.Component {
    displayName = 'Comp';

    screenshot = () => {
        const cont = ReactDOM.findDOMNode(this.content);
        html2canvas(cont,{
            width: cont.offsetWidth,
            height: cont.offsetHeight + 170
        }).then((canvas) => {
            this.img.src = canvas.toDataURL('image/png', 1.0);
            this.dialog.open();
        });
    }

    render () {
        const {monitor} = this.props.dashboard;
        const mapData = monitor.getMapData();
        return (
            <div>
                <Breadcrumb>
                    <Breadcrumb.Item>三方扩展</Breadcrumb.Item>
                    <Breadcrumb.Item>截屏</Breadcrumb.Item>
                </Breadcrumb>

                <Row className='mt-30' gutter={15} ref={(f) => this.content = f}>
                    <Col grid={1}>
                        <Card title='活动实时交易情况'>
                            <Row gutter={15}>
                                <Col grid={.25}>
                                    <div className='text-promote'>今日交易总额</div>
                                    <div className='number-font mt-5'>124,543,233元</div>
                                </Col>
                                <Col grid={.25}>
                                    <div className='text-promote'>销售目标完成率</div>
                                    <div className='number-font mt-5'>90%</div>
                                </Col>
                                <Col grid={.25}>
                                    <div className='text-promote'>活动剩余时间</div>
                                    <div className='number-font mt-5'>01:00:00</div>
                                </Col>
                                <Col grid={.25}>
                                    <div className='text-promote'>每秒交易总额</div>
                                    <div className='number-font mt-5'>200元</div>
                                </Col>
                            </Row>
                            <MarkPointMap data={mapData}></MarkPointMap>
                        </Card>
                    </Col>
                </Row>

                <div className='mt-25 text-center'>
                    <Button onClick={this.screenshot}>截图</Button>
                </div>

                <Dialog title='截图' ref={(f) => this.dialog = f}>
                    <img ref={(f) => this.img = f} style={{width: 800, margin: '0 auto', display: 'block'}}/>
                </Dialog>
            </div>
        );
    }
}
export default Comp;
