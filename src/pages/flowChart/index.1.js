import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Raphael from 'raphael';
import Dropdown from 'r-cmui/components/Dropdown';
import Menu from 'r-cmui/components/Menu';
import UUID from 'r-cmui/components/utils/UUID';

import './style.less';

class Page extends Component {
    displayName = 'Page';

    constructor (props) {
        super(props);
        this.startX = 45;
        this.startY = 30;
        this.itemWidth = 175;
        this.itemHeight = 56;
        this.levelGap = 140;

        this.items = {};
        this.lines = {};
        this.pBoxs = {};
        this.tBoxs = {};

        const newData = [];
        // this.rebuildData(data, newData, 0, 0, 1, {});

        this.state = {
            data: newData
        };

        this.itemIndex = 0;
    }

    /**
     * [rebuildData description]
     * @param  {[type]} data    [description]
     * @param  {[type]} newData [description]
     * @param  {[type]} level   [description]
     * @param  {[type]} index   [description]
     * @return {[type]}         [description]
     */
    rebuildData (data, newData, level, index, total, parent) {
        data.level = level;
        data.index = index;
        data.total = total;
        data.parent = parent;
        newData.push(data);
        if (data.items) {
            data.items.forEach((item, index) => {
                this.rebuildData(item, newData, level + 1, index, data.items.length, data);
            });
        }
    }

    componentWillMount () {
        fetch('http://172.18.34.66:8415/mock/flow/getFlowData').then((res) => {
            return res.json();
        }).then((ret) => {
            const newData = [];
            this.rebuildData(ret, newData, 0, 0, 1, {});

            this.setState({
                data: newData
            }, () => {
                this.renderLinks();
                this.renderBoxes();
            });
        });
    }

    componentDidMount () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.paper = Raphael(canvas, canvas.offsetWidth, canvas.offsetHeight - 10);

        setTimeout(() => {
            this.renderLinks();
            this.renderBoxes();
        }, 0);
    }

    getCanvasSize () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        return {
            w: canvas.offsetWidth,
            h: canvas.offsetHeight
        };
    }

    renderItems () {
        const eles = this.state.data.map((item) => {
            return <Item ref={(ref) => { this.items[item.id] = ref; }} data={item} key={this.itemIndex++} root={this} />;
        });

        return eles;
    }

    renderLinks () {
        const data = this.state.data;
        data.forEach((item) => {
            if (item.level > 0) {
                const id = item.id;
                const pos = item.position;
                const parentPos = item.parent.position;

                this.renderLink(id, pos, parentPos, item.ratio);
            }
        });
    }

    renderBoxes () {
        const data = this.state.data;
        data.forEach((item) => {
            this.renderBox(item, 15);
        });
    }

    renderLink (id, pos, parentPos, ratio) {
        const x = parentPos.x + this.itemWidth;
        const y = parentPos.y + this.itemHeight / 2;
        const itemx = pos.x;
        const itemy = pos.y + this.itemHeight / 2;

        let H = 56;
        if (ratio) {
            H = Math.max(H * ratio / 100, 15) - 4;
        }

        const line = this.polyline(x, y, x + 100, y, itemx - 50, itemy, itemx, itemy, H);
        line.attr('fill', '#daecff');
        this.lines[id] = line;

        // this.renderBox(id, x, y, itemx, itemy, 15);
    }

    renderBox (item, h) {
        const H = h + 6;
        if (item.level && !this.pBoxs[item.id]) {
            let boxH = 56;
            if (item.ratio) {
                boxH = Math.max(boxH * item.ratio / 100, 15);
            }
            const x = item.position.x;
            const y = item.position.y + this.itemHeight / 2;

            const box = this.paper.rect(x - 6, y - boxH / 2, 6, boxH).attr({'fill': 'rgb(137, 183, 232)', 'stroke-width': 0});
            this.pBoxs[item.id] = box;
        }

        if (item.items && item.items.length && !this.tBoxs[item.id]) {
            const x = item.position.x + this.itemWidth;
            const y = item.position.y + this.itemHeight / 2;

            const box = this.paper.rect(x, y - H / 2, 6, H).attr({'fill': 'rgb(137, 183, 232)', 'stroke-width': 0});
            this.tBoxs[item.id] = box;
        }
    }

    polyline (x, y, ax, ay, bx, by, zx, zy, H) {
        const h = H / 2;
        zx = zx - 6;
        const lineWidth = 2;
        const path = [['M', x, y - lineWidth], ['C', ax, ay - lineWidth, bx, by - h, zx, zy - h],
            ['L', zx, zy + h], ['C', bx, by + h, ax, ay + lineWidth, x, y + lineWidth, 'Z']];
        return this.paper.path(path).attr({stroke: '#daecff', 'stroke-width': 1, 'stroke-linecap': 'round'});
    }

    getFlowData (itemData) {
        this.clearAllNextLevel(-1);
        fetch('http://172.18.34.66:8415/mock/flow/getFlowData').then((res) => {
            return res.json();
        }).then((ret) => {
            const newData = [];
            this.rebuildData(ret, newData, 0, 0, 1, {});

            this.setState({
                data: newData
            }, () => {
                this.renderLinks();
                this.renderBoxes();
            });
        });
    }

    getNextFlowData (item, itemData) {
        this.clearAllNextLevel(itemData.level);

        fetch('http://172.18.34.66:8415/mock/flow/getNextFlowData').then((res) => {
            return res.json();
        }).then((items) => {
            itemData.items = items;

            const data = this.state.data;
            items.forEach((sub, index) => {
                sub.level = itemData.level + 1;
                sub.index = index;
                sub.total = items.length;
                sub.parent = itemData;

                data.push(sub);
            });

            this.setState({
                data
            }, () => {
                items.forEach((sub, index) => {
                    const id = sub.id;
                    const pos = sub.position;
                    const parentPos = sub.parent.position;

                    this.renderLink(id, pos, parentPos, sub.ratio);
                    this.renderBox(sub, 15);
                });
                this.renderBox(itemData, 15);

                this.updateCanvasSize();
            });
        });
    }

    updateCanvasSize () {
        const data = this.state.data;
        const last = data[data.length - 1];
        const level = last.level;
        let width = this.startX + (this.itemWidth + this.levelGap) * level + this.itemWidth;
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);

        width = Math.max(width, canvas.clientWidth);
        width = width > canvas.clientWidth ? width + 50 : width;
        this.paper.setSize(width, canvas.offsetHeight - 10);
        const placeHelper = ReactDOM.findDOMNode(this.refs.placeHelper);
        placeHelper.style.width = `${width}px`;
        placeHelper.style.height = `${canvas.clientHeight}px`;
    }

    clearAllNextLevel (level) {
        const data = this.state.data;
        for (let i = data.length - 1; i >= 0; i--) {
            const item = data[i];
            if (item.level > level) {
                data.splice(i, 1);
                const line = this.lines[item.id];
                if (line) {
                    line.remove();
                    delete this.lines[item.id];
                }

                const box = this.pBoxs[item.id];
                if (box) {
                    box.remove();
                    delete this.pBoxs[item.id];
                }
                const pbox = this.tBoxs[item.parent.id];
                if (pbox) {
                    pbox.remove();
                    delete this.tBoxs[item.parent.id];
                }
            }
        }
    }

    render () {
        return (
            <div style={{width: '100%', height: '100%', position: 'relative', overflow: 'auto'}}>
                <div ref='canvas' style={{width: '100%', height: '100%'}}></div>
                <div ref='placeHelper' style={{position: 'absolute', top: '0', left: 0, width: '100%', height: '100%'}}>
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

class Item extends Component {
    displayName = 'Item';
    
    constructor (props) {
        super(props);
        this.state = {
            data: props.data,
            active: false,
            x: 0,
            y: 0,
            hover: false
        };

        this.level = props.data.level;
        this.index = props.data.index;
        this.total = props.data.total;

        this.itemWidth = 175;
        this.itemHeight = 56;
        this.itemGap = 20;
        this.levelGap = 140;
    }

    isRoot () {
        return !this.level;
    }

    getParentPosition () {
        return this.state.data.parent.position;
    }

    position () {
        return {
            x: this.state.x,
            y: this.state.y
        };
    }

    renderItem () {
        const data = this.state.data;
        if (this.props.renderItem) {
            return this.props.renderItem;
        }
        return <div>
            <div className='flow-ratio'>{`${data.ratio}%`}</div>
            <div className='flow-item-name'>{data.name}</div>
        </div>;
    }

    setRoot (e) {
        e.preventDefault();
        e.stopPropagation();

        this.props.root.getFlowData(this.state.data);
        return false;
    }

    renderTools () {
        if (this.level) {
            const details = this.renderDetails();
            return (
                <div className='flow-item-tools' style={{display: this.state.hover ? '' : 'none'}}>
                    <i className='fa fa-gear' title='设为根节点' onClick={this.setRoot.bind(this)}></i>
                    <Dropdown ref='dropdown' action='click' overlay={details} onVisibleChange={this.updateContent.bind(this)}>
                        <i className='fa fa-list' title='查看详情'></i>
                    </Dropdown>
                </div>
            );
        } else {
            return null;
        }
    }

    updateContent (visible) {
        if (visible) {
            this.refs.dropdown.refs.trigger.popupRef.setContent(this.renderDetails());
        }
    }

    renderDetails () {
        const data = {
            count: Math.round((Math.random() * 1000)),
            time: Math.round((Math.random() * 100)),
            ratio: Math.round((Math.random() * 0.5) * 100) / 100
        };
        return <div className='flow-details'>
            <div>访问次数： {data.count}</div>
            <div>访问停留时间：{data.time}</div>
            <div>页面跳出率：{data.ratio}</div>
        </div>;
    }

    showTools () {
        if (this.level) {
            if (this.props.root.lastHoverItem) {
                this.props.root.lastHoverItem.hideTools();
            }
            this.props.root.lastHoverItem = this;
            this.setState({hover: true});
        }
    }

    hideTools () {
        if (this.level) {
            this.setState({hover: false});
        }
    }

    getNextFlowData () {
        this.props.root.getNextFlowData(this, this.state.data);
    }

    componentDidMount () {
        const root = this.props.root;
        const parent = this.state.data.parent;
        const x = root.startX + (this.itemWidth + this.levelGap) * this.level;
        let y = 0;

        if (!this.level) {
            y = (root.getCanvasSize().h - this.itemHeight) / 2;
        } else {
            const parentPos = this.getParentPosition();
            const allH = (this.itemHeight + this.itemGap) * this.total - this.itemGap;
            let offsetH = parentPos.y + this.itemHeight / 2 - allH / 2;
            offsetH = Math.max(root.startY, offsetH);

            y = offsetH + (this.itemHeight + this.itemGap) * this.index;
        }

        this.setState({
            x,
            y
        });

        this.state.data.position = {
            x,
            y
        };
    }

    render () {
        const style = {
            position: 'absolute',
            left: this.state.x,
            top: this.state.y,
            width: this.itemWidth,
            height: this.itemHeight
        };
        return (
            <div className='flow-item' style={style}
                onClick={this.getNextFlowData.bind(this)}
                onMouseEnter={this.showTools.bind(this)}
            >
                {this.renderItem()}
                {this.renderTools()}
            </div>
        );
    }
}

export default Page;
