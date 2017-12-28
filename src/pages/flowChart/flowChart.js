import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Raphael from 'raphael';
import Dropdown from 'r-cmui/components/Dropdown';

import './style.less';

const ITEMWIDTH = 175;
const ITEMHEIGHT = 56;
const ITEMGAP = 35;
const LEVELGAP = 140;
const BOXSIZE = 20;
const HIGHLIGHT_COLOR = 'rgba(152,220,7,.7)';
const COLOR = '#daecff';

class Page extends Component {
    displayName = 'Page';

    constructor (props) {
        super(props);
        this.startX = 45;
        this.startY = 30;

        this.items = {};
        this.lines = {};
        this.pBoxs = {};
        this.tBoxs = {};

        this.width = 0;
        this.height = 0;

        const newData = [];
        if (props.data) {
            this.rebuildData(props.data, newData);
        }
        this.state = {
            data: newData
        };

        this.highlights = [];
    }

    /**
     * [rebuildData description]
     * @param  {[type]} data    [description]
     * @param  {[type]} newData [description]
     * @param  {[type]} level   [description]
     * @param  {[type]} index   [description]
     * @return {[type]}         [description]
     */
    rebuildData (data, newData) {
        this.nodeMap = {};
        data.forEach((item, index) => {
            item.forEach((iter, iterIndex) => {
                iter.level = index;
                iter.index = iterIndex;
                iter.total = item.length;
                this.nodeMap[iter.id] = iter;
                newData.push(iter);
                delete iter['parents'];
                delete iter['children'];
            });
        });

        let max = 0;
        data.forEach((item) => {
            max = Math.max(max, item.length);
            item.forEach((iter) => {
                if (iter.items) {
                    iter.children = [];
                }
                iter.items && iter.items.forEach((id) => {
                    const node = this.nodeMap[id];
                    if (node) {
                        if (node.parents) {
                            node.parents.push(iter);
                        } else {
                            node.parents = [iter];
                        }
                        iter.children.push(node);
                        if (node.level === iter.level) {
                            node.hasLevelParent = true;
                        }
                    }
                });
            });
        });

        this.checkInValidLink(newData);

        this.width = this.startX + (ITEMWIDTH + LEVELGAP) * data.length + ITEMWIDTH;
        this.height = this.startY * 2 + (ITEMHEIGHT + ITEMGAP) * max - ITEMGAP;
    }

    checkInValidLink (data) {
        const leafs = this.getLeafs(data);
        leafs.forEach((leaf) => {
            const parents = leaf.parents;
            this.checkNodeValidLink(leaf, parents);
        });
    }

    checkNodeValidLink (node, parents) {
        parents.forEach((parent) => {
            if (parent.parents) {
                parent.parents.forEach((pp) => {
                    const index = parents.indexOf(pp);
                    if (index > 0) {
                        parents.splice(index, 1);
                        const aIndex = pp.children.indexOf(node);
                        pp.children.splice(aIndex, 1);
                    }
                });

                this.checkNodeValidLink(node, parent.parents);
            }
        });
    }

    getLeafs (data) {
        return data.filter((item) => {
            return item.parents && !item.children;
        });
    }

    componentDidMount () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        this.paper = Raphael(canvas, canvas.offsetWidth, canvas.offsetHeight - 10);

        this.updateCanvasSize();

        this.renderLinks();
        this.renderBoxes();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.data !== this.props.data) {
            const newData = [];
            if (nextProps.data) {
                this.rebuildData(nextProps.data, newData);
            }

            this.setState({
                data: newData
            }, () => {
                this.updateCanvasSize();
                this.paper.clear();

                this.lines = {};
                this.renderLinks();

                this.pBoxs = {};
                this.tBoxs = {};

                this.renderBoxes();
            });
        }
    }

    /**
     * 可视区域的宽高
     */
    getViewSize () {
        return {
            width: this.width,
            height: this.height
        };
    }

    getCanvasSize () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);
        return {
            w: canvas.offsetWidth,
            h: canvas.offsetHeight
        };
    }

    getItem (id) {
        return this.items[id];
    }

    // removeNode (node) {
    //     const data = this.state.data;
    //     const index = data.indexOf(node);
    //     if (index > -1) {
    //         node.parents.forEach((parent) => {
    //             const inx = parent.children.indexOf(node);
    //             parent.children.splice(inx, 1);
    //             if (!parent.children.length) {
    //                 delete parent.children;
    //             }
    //         });

    //         node.children.forEach((child)=>{

    //         });
    //         data.splice(index);
    //     }
    // }

    clearHighlight () {
        this.highlights.forEach((id) => {
            const lines = this.lines[id];
            if (lines) {
                lines.forEach((line) => {
                    line.stop().attr({'fill': COLOR});
                });
            }
        });
        this.highlights = [];
    }

    addHighlight (item) {
        this.highlights.push(item);
    }

    highlight () {
        this.highlights.forEach((id) => {
            const lines = this.lines[id];
            if (lines) {
                lines.forEach((line) => {
                    line.animate({'fill': HIGHLIGHT_COLOR}, 300);
                });
            }
        });
    }

    unBind (id) {
        delete this.items[id];
    }

    renderItems () {
        if (this.state.data && this.state.data.length) {
            const eles = this.state.data.map((item) => {
                return <Item 
                    ref={(ref) => { this.items[item.id] = ref; }}
                    data={item}
                    key={item.id}
                    root={this}
                    onEdit={this.props.onEdit}
                    onEditLink={this.props.onEditLink}
                    onDelete={this.props.onDelete}
                />;
            });

            return eles;
        }
        return null;
    }

    renderLinks () {
        const data = this.state.data;
        if (data && data.length) {
            data.forEach((item) => {
                if (item.level > 0 && item.parents) {
                    const id = item.id;
                    let pos = item.position;

                    item.parents.forEach((parent) => {
                        let parentPos = parent.position;
                        if (parent.hasLevelParent) {
                            parentPos = {
                                x: parent.position.x,
                                y: parent.position.y + ITEMHEIGHT / 2 - BOXSIZE / 2
                            };
                        }

                        if (item.level === parent.level) {
                            pos = {};
                            pos.x = item.position.x + ITEMWIDTH + 6;
                            pos.y = item.position.y - ITEMHEIGHT / 2 + BOXSIZE / 2;
    
                            this.renderCircleLink(id, pos, parentPos, item.ratio);
                        } else {
                            this.renderLink(id, pos, parentPos, item.ratio);
                        }
                    });
                }
            });
        }
    }

    renderBoxes () {
        const data = this.state.data;
        if (data && data.length) {
            data.forEach((item) => {
                this.renderBox(item);
            });
        }
    }

    renderLink (id, pos, parentPos, ratio) {
        const x = parentPos.x + ITEMWIDTH;
        const y = parentPos.y + ITEMHEIGHT / 2;
        const itemx = pos.x;
        const itemy = pos.y + ITEMHEIGHT / 2;

        let H = 21;
        if (ratio) {
            H = Math.max(H * ratio / 100, 15) - 4;
        }

        const line = this.polyline(x, y, x + 100, y, itemx - 50, itemy, itemx, itemy, H);
        line.attr('fill', COLOR);
        
        if (this.lines[id]) {
            this.lines[id].push(line);
        } else {
            this.lines[id] = [line];
        }
    }

    renderCircleLink (id, pos, parentPos) {
        const x = parentPos.x + ITEMWIDTH;
        const y = parentPos.y + ITEMHEIGHT / 2;
        const itemx = pos.x;
        const itemy = pos.y + ITEMHEIGHT / 2;

        const H = 21;

        const line = this.polyline2(x, y, x + LEVELGAP, (y + itemy) / 2, itemx, itemy, itemx, itemy, H);
        line.attr('fill', '#daecff');
        if (this.lines[id]) {
            this.lines[id].push(line);
        } else {
            this.lines[id] = [line];
        }
    }


    renderBox (item) {
        if (item.level && item.parents && !item.hasLevelParent && !this.pBoxs[item.id]) {
            let boxH = BOXSIZE;
            if (item.ratio) {
                boxH = Math.max(boxH * item.ratio / 100, 15);
            }
            const x = item.position.x;
            const y = item.position.y + ITEMHEIGHT / 2;

            const box = this.paper.rect(x - 6, y - boxH / 2, 6, boxH).attr({'fill': 'rgb(137, 183, 232)', 'stroke-width': 0});
            this.pBoxs[item.id] = box;
        }

        if (item.children && item.children.length && !this.tBoxs[item.id]) {
            const x = item.position.x + ITEMWIDTH;
            let y = item.position.y + ITEMHEIGHT / 2;
            if (item.hasLevelParent) {
                y = item.position.y + ITEMHEIGHT - BOXSIZE / 2;
            }

            const box = this.paper.rect(x, y - BOXSIZE / 2, 6, BOXSIZE).attr({'fill': 'rgb(152,220,7)', 'stroke-width': 0});
            this.tBoxs[item.id] = box;
        }

        // 同一个level的话前置box放在后上方
        if (item.hasLevelParent && !this.pBoxs[item.id]) {
            const x = item.position.x + ITEMWIDTH + 6;
            const y = item.position.y + BOXSIZE / 2;

            const box = this.paper.rect(x - 6, y - BOXSIZE / 2, 6, BOXSIZE).attr({'fill': 'rgb(137, 183, 232)', 'stroke-width': 0});
            this.pBoxs[item.id] = box;
        }
    }

    polyline (x, y, ax, ay, bx, by, zx, zy, H) {
        const h = H / 2;
        // zx = zx - 6;
        const lineWidth = 2;
        const path = [['M', x, y - lineWidth / 2], ['C', ax, ay, bx, by - h, zx, zy - h],
            ['L', zx, zy + h], ['C', bx, by, ax, ay + lineWidth / 2, x, y + lineWidth / 2, 'Z']];
        return this.paper.path(path).attr({stroke: '#daecff', 'stroke-width': 1, 'stroke-linecap': 'round', 'arrow-end': 'classic-wide-long'});
    }

    polyline2 (x, y, ax, ay, bx, by, zx, zy, H) {
        const h = H / 2;
        const lineWidth = 2;
        const path = [['M', x, y + lineWidth / 2], ['C', ax, ay, bx, by - h, zx, zy - h],
            ['L', zx, zy + h], ['C', bx, by, ax + H, ay - h, x, y, 'Z']];
        return this.paper.path(path).attr({stroke: '#daecff', 'stroke-width': 1, 'stroke-linecap': 'round', 'arrow-end': 'classic-wide-long'});
    }

    updateCanvasSize () {
        const canvas = ReactDOM.findDOMNode(this.refs.canvas);

        let width = Math.max(this.width, canvas.clientWidth);
        const height = Math.max(this.height, canvas.clientHeight);
        width = width > canvas.clientWidth ? width + 50 : width;
        this.paper.setSize(this.width, this.height);
        const placeHelper = ReactDOM.findDOMNode(this.refs.placeHelper);
        placeHelper.style.width = `${width}px`;
        placeHelper.style.height = `${height}px`;
        this.wrap.style.height = `${height + 30}px`;
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
            <div ref={(f) => this.wrap = f} style={{width: '100%', height: '100%', position: 'relative', overflow: 'auto'}}>
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

    timer = null;

    constructor (props) {
        super(props);
        this.state = {
            hover: false,
            showTools: false
        };
    }

    isRoot () {
        return !this.props.data.level;
    }

    position () {
        return {
            x: this.props.data.position.x,
            y: this.props.data.position.y
        };
    }

    renderItem () {
        const data = this.props.data;
        if (this.props.renderItem) {
            return this.props.renderItem;
        }
        return <div>
            <div className='flow-ratio'>{`${data.ratio}%`}</div>
            <div className='flow-item-name'>{data.name}</div>
        </div>;
    }

    onClick = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.data, this);
        }
    }

    onEdit = () => {
        if (this.props.onEdit) {
            this.props.onEdit(this.props.data, this);
        }
    }

    onEditLink = () => {
        if (this.props.onEditLink) {
            this.props.onEditLink(this.props.data, this);
        }
    }

    onDelete = () => {
        if (this.props.onDelete) {
            this.props.onDelete(this.props.data, this);
        }
    }

    hideTools () {
        if (this._isMounted) {
            this.setState({
                showTools: false
            });
        }
    }

    onMouseEnter = () => {
        const {root} = this.props;
        if (root.lastActive) {
            root.lastActive.hideTools();
        }
        root.lastActive = this;

        this.setState({
            active: true,
            showTools: true
        });

        this.timer = window.setTimeout(() => {
            this.highlightConnections();
        }, 300);
    }

    onMouseLeave = () => {
        window.clearTimeout(this.timer);
        this.setState({
            active: false
        });

        this.unHighlightConnections();
    }

    highlight (highlight) {
        this.setState({
            active: highlight
        });
    }

    highlightConnections () {
        const {root} = this.props;
        root.clearHighlight();
        root.addHighlight(this.props.data.id);
        this.highlightChildrenConnection(true);
        this.highlightParentConnection(true);

        root.highlight();
    }
    
    unHighlightConnections () {
        const {root} = this.props;
        this.highlightChildrenConnection(false);
        this.highlightParentConnection(false);
        root.clearHighlight();
    }

    highlightChildrenConnection (highlight) {
        const {data, root} = this.props;
        if (data.children) {
            data.children.forEach((child) => {
                if (child) {
                    const childNode = root.getItem(child.id);
                    if (childNode && childNode.highlightChildrenConnection) {
                        if (highlight) {
                            root.addHighlight(childNode.props.data.id);
                        }
                        childNode.highlight(highlight);
                        childNode.highlightChildrenConnection(highlight);
                    }
                }
            });
        }
    }

    highlightParentConnection (highlight) {
        const {data, root} = this.props;
        if (data.parents) {
            data.parents.forEach((parent) => {
                const node = root.getItem(parent.id);
                if (node && node.highlightParentConnection) {
                    if (highlight) {
                        root.addHighlight(node.props.data.id);
                    }
                    node.highlight(highlight);
                    node.highlightParentConnection(highlight);
                }
            });
        }
    }

    calculatePosition () {
        const {root, data} = this.props;
        const {level, total, index} = data;
        const x = root.startX + (ITEMWIDTH + LEVELGAP) * level;
        let y = 0;
        const allH = root.getViewSize().height;
        const middleY = allH / 2;

        y = middleY - (total / 2 - index) * ITEMHEIGHT - ((total / 2 - index - 1) + 0.5) * ITEMGAP;
        data.position = {
            x,
            y
        };

        return {
            x, y
        };
    }

    componentDidMount () {
        this._isMounted = true;
    }
    
    componentWillUnmount () {
        this._isMounted = false;
        this.props.root.unBind(this.props.data.id);
    }

    componentWillReceiveProps () {
        this.setState({
            active: false
        });
    }

    render () {
        const pos = this.calculatePosition();
        const style = {
            position: 'absolute',
            left: pos.x,
            top: pos.y,
            width: ITEMWIDTH,
            height: ITEMHEIGHT
        };

        const clazzName = classNames('flow-item', {
            'flow-item-active': this.state.active,
            'flow-item-showTools': this.state.showTools
        });
        return (
            <div className={clazzName} style={style}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
            >
                {this.renderItem()}
                <div className='flow-item-tools'>
                    <i className='fa fa-edit' title='编辑' onClick={this.onEdit}></i>
                    <i className='fa fa-share-alt' title='编辑关系' onClick={this.onEditLink}></i>
                    <i className='fa fa-trash' title='删除' onClick={this.onDelete}></i>
                </div>
            </div>
        );
    }
}

export default Page;
