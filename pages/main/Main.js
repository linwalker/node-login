/**
 * Created by linyuhua on 2017/5/17.
 */
import React from 'react'
import { Layout, Menu, } from 'antd'
const { Header, Content, Footer } = Layout
class App extends React.Component {
    handleClick = (item) => {
        const path = item.key;
        location.href = path;
    }
    render() {
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        onClick={this.handleClick}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="/home">login</Menu.Item>
                        <Menu.Item key="/main">article</Menu.Item>
                        <Menu.Item key="/editor">editor</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <h2>login suceess!</h2>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Node-Login ©2017 Created by linwalker
                </Footer>
            </Layout>
        )
    }
}

export default App;