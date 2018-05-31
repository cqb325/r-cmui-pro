import React from 'react';
import Layout from 'r-cmui/components/Layout';
import Sider from 'r-cmui/components/Layout/Sider';
import FontIcon from 'r-cmui/components/FontIcon';
import Badge from 'r-cmui/components/Badge';
import Dropdown from 'r-cmui/components/Dropdown';
import Menu from 'r-cmui/components/Menu';
import Nav from './Nav';
import routers, {Register, FindPassword} from './routers';
import Login from './pages/login';
import CustomFooter from './components/Footer';
const {Header, Content, Footer} = Layout;
const {Item, Divider} = Menu;

import './index.less';
import './App.less';

import { inject, observer } from 'mobx-react';

@inject('auth')
@observer
class App extends React.Component {
    displayName = 'App';

    state = {
        collapse: false
    };

    collapse = () => {
        this.setState({collapse: !this.state.collapse}, () => {
            this.refs.nav.setCollapse(this.state.collapse);
            this.refs.sider.setCollapsed(this.state.collapse);
        });
    }

    setCollapse (collapse) {
        this.setState({collapse}, () => {
            this.refs.nav.setCollapse(collapse);
            this.refs.sider.setCollapsed(collapse);
        });
    }

    componentDidMount () {
        window.addEventListener('resize', () => {
            if (document.documentElement.clientWidth <= 992) {
                this.setCollapse(true);
            } else {
                this.setCollapse(false);
            }
        }, false);
    }

    logout = () => {
        this.props.auth.logout();
    }

    selectMenu = (item) => {
        if (item.props.type === 'logout') {
            this.logout();
        }
    }

    renderUserMenu () {
        return <Menu onSelect={this.selectMenu}>
            <Item><FontIcon icon='user' className='mr-10'/>个人中心</Item>
            <Item><FontIcon icon='cog' className='mr-10'/>设置</Item>
            <Divider/>
            <Item type='logout'><FontIcon icon='sign-out' className='mr-10' />退出系统</Item>
        </Menu>;
    }
    
    render () {
        const current = this.props.location.pathname;
        if (current === '/register') {
            return <Register/>;
        } else if (current === '/forgetPassword') {
            return <FindPassword />;
        } else if (current === '/login') {
            return <Login from={this.props.location.pathname} params={this.props.match.params}/>;
        } else {
            // if (this.props.auth.userInfo) {
            return (
                <Layout className='app'>
                    <Sider ref='sider'>
                        <div className='text-center logo'>{this.state.collapse ? 'Pro' : 'RCMUI Pro'}</div>
                        <Nav ref='nav'/>
                    </Sider>
                    <Layout style={{background: '#f0f2f5'}}>
                        <Header>
                            <FontIcon icon={this.state.collapse ? 'indent' : 'dedent'} className='menu-collapse' onClick={this.collapse}></FontIcon>
                            <div className='pull-right'>
                                <Badge count={13}><FontIcon icon='bell-o' style={{fontSize: 17}}></FontIcon></Badge>
                                <Dropdown overlay={this.renderUserMenu()} align='bottomRight'>
                                    <span id='username'>{this.props.auth.userInfo.nicename}</span>
                                </Dropdown>
                            </div>
                        </Header>
                        <Content>
                            <div className='main-container'>
                                {routers}
                            </div>
                        </Content>
                        <Footer>
                            <CustomFooter/>
                        </Footer>
                    </Layout>
                </Layout>
            );
            // } else {
            //     return <Login from={this.props.location.pathname} params={this.props.match.params}/>;
            // }
        }
    }
}

export default App;
