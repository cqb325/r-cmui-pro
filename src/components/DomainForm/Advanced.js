import React from 'react';
import Row from 'r-cmui/components/Row';
import Form from 'r-cmui/components/Form';
import FormControl from 'r-cmui/components/FormControl';
import Tooltip from 'r-cmui/components/Tooltip';
import CacheTypeAndPeriod from './CacheTypeAndPeriod';
import DomainShare from './DomainShare';
import CheckType from './CheckType';

class Advanced extends React.Component {
    displayName = 'Advanced';

    state = {
        blockLoop: 0,
        encryption: 0,
        cacheType: 0,
        stealing: 0,
        domainShare: 0,
        videoDrag: 0,
        paramFilter: 0
    };

    onSwitchChange (type, value) {
        const params = {};
        params[type] = value;
        this.setState(params);
    }

    /**
     * 改变防盗链的开关
     */
    changeStealing = (value) => {
        this.setState({
            stealing: value
        });
    }

    getValue () {
        const params = Object.assign({}, this.state);
        if (params.stealing) {
            const antiStealingLink = this.refs.checkType.getValue();
            params.antiStealingLink = antiStealingLink;
        }
        if (params.cacheType) {
            const cacheTypeAndPeriod = this.refs.cacheType.getValue();
            params.cacheTypeAndPeriod = cacheTypeAndPeriod;
        }
        if (params.domainShare) {
            const domainShare = this.refs.domainShare.getValue();
            params.shareDomains = domainShare;
        }
        return params;
    }

    isValid () {
        return this.refs.checkType.isValid() && this.refs.cacheType.isValid() && this.refs.domainShare.isValid();
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.blockLoop != this.props.blockLoop) {
            this.setState({
                blockLoop: nextProps.blockLoop,
                encryption: nextProps.encryption,
                cacheType: nextProps.cacheType,
                stealing: nextProps.stealing,
                domainShare: nextProps.domainShare,
                videoDrag: nextProps.videoDrag,
                paramFilter: nextProps.paramFilter
            });
        }
    }

    render () {
        return (
            <Form ref='form' component='div'>
                <FormControl name='blockLoop' label='分片回源' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.blockLoop} onChange={this.onSwitchChange.bind(this, 'blockLoop')}/>
                <Form.Promote>Range 回源，指客户端通知源站服务器只返回指定范围的部分内容，对于较大文件分发加速有很大帮助</Form.Promote>

                <FormControl name='encryption' label='文件压缩功能' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.encryption} onChange={this.onSwitchChange.bind(this, 'encryption')}/>
                <Form.Promote>对静态文件类型进行压缩，有效减少用户传输内容大小</Form.Promote>

                <FormControl name='cacheType' label='缓存类型与过期时间' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.cacheType} onChange={this.onSwitchChange.bind(this, 'cacheType')}/>
                <Form.Promote>自定义指定资源内容的缓存过期时间规则，支持指定路径或者文件名后缀方式。目录需以/开头，如：/www/directory/aaa；</Form.Promote>
                <Form.Promote>文件后缀如输入多个需以半角逗号分隔，如：jpg,txt。</Form.Promote>
                <Row style={{display: this.state.cacheType ? 'block' : 'none'}}>
                    <CacheTypeAndPeriod data={this.props.cacheTypeAndPeriod} ref='cacheType' />
                </Row>

                <FormControl name='stealing' label='防盗链开关' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.stealing} onChange={this.changeStealing}/>
                <Tooltip title='提示信息'><i className='fa fa-question-circle-o ml-10 text-promote' style={{fontSize: 16}}></i></Tooltip>
                <Form.Promote>自定义指定资源内容的缓存过期时间规则，支持指定路径或者文件名后缀方式。目录需以/开头，如：/www/directory/aaa；</Form.Promote>
                <Row style={{display: this.state.stealing ? 'block' : 'none'}}>
                    <CheckType ref='checkType' data={this.props.antiStealingLink}/>
                </Row>

                <FormControl name='domainShare' label='多域名存储共享' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.domainShare} onChange={this.onSwitchChange.bind(this, 'domainShare')}/>
                <Form.Promote>两个域名共享同一个缓存</Form.Promote>
                <Row style={{display: this.state.domainShare ? 'block' : 'none'}}>
                    <DomainShare ref='domainShare' data={this.props.shareDomains} />
                </Row>

                <FormControl name='videoDrag' label='视频拖拽功能' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.videoDrag} onChange={this.onSwitchChange.bind(this, 'videoDrag')}/>
                <Form.Promote>开启即支持视音频点播的随机拖拽播放功能</Form.Promote>
                <FormControl name='paramFilter' label='过滤参数' checkedText='开启' unCheckedText='关闭' type='switch' value={this.state.paramFilter} onChange={this.onSwitchChange.bind(this, 'paramFilter')}/>
                <Form.Promote>回源时会去除 URL 中 ? 之后的参数，有效提高文件缓存命中率，提升分发效率</Form.Promote>
            </Form>
        );
    }
}

FormControl.register(Advanced, 'advanced');

export default Advanced;
