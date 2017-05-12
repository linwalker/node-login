/**
 * Created by linyuhua on 2017/5/12.
 */
import React from 'react'
import { Layout, Menu, Breadcrumb } from 'antd'

import 'antd/lib/layout/style/css'

const { Header, Content, Footer } = Layout

class App extends React.Component {
    render() {
        return (
            <Layout className="layout">
                <Content style={{ padding: '0 50px' }}>
                    <Breadcrumb style={{ margin: '12px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <p>index</p>
                    </div>
                </Content>
            </Layout>
        )
    }
}

export default App;