/**
 * Created by lilei on 2016/5/25.
 */

import {Link} from 'react-router'
import { Menu, Icon, Switch } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// <Switch onChange={this.changeMode} />
const Menulist = React.createClass({
    getInitialState() {
        return {
            mode: 'inline'
        };
    },
    changeMode(value) {
        this.setState({
            mode: value ? 'vertical' : 'inline'
        });
    },
    render() {
        return (
            <div>
                <Menu
                    style={{ width: 220 }}
                    defaultOpenKeys={['sub1']}
                    mode={this.state.mode}>
                    <SubMenu key="sub1" title={<span><Icon type="mail" /><span>导航一</span></span>}>
                        <MenuItemGroup title="分组1">
                            <Menu.Item key="1"><Link className="" to="/yh/react">异步请求的案例</Link></Menu.Item>
                            <Menu.Item key="2"><Link className="" to="/yh/Start">首页</Link></Menu.Item>
                            <Menu.Item key="3"><Link className="" to="/yh/list">列表页</Link></Menu.Item>
                        </MenuItemGroup>
                        <MenuItemGroup title="分组2">
                            <Menu.Item key="4">选项3</Menu.Item>
                            <Menu.Item key="5">选项4</Menu.Item>
                        </MenuItemGroup>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>导航二</span></span>}>
                        <Menu.Item key="6">选项5</Menu.Item>
                        <Menu.Item key="7">选项6</Menu.Item>
                        <SubMenu key="sub3" title="三级导航">
                            <Menu.Item key="8">选项7</Menu.Item>
                            <Menu.Item key="9">选项8</Menu.Item>
                        </SubMenu>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="setting" /><span>导航三</span></span>}>
                        <Menu.Item key="10">选项9</Menu.Item>
                        <Menu.Item key="11">选项10</Menu.Item>
                        <Menu.Item key="12">选项11</Menu.Item>
                        <Menu.Item key="13">选项12</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        );
    }
});

module.exports = Menulist;