/**
 * Created by linyuhua on 2017/5/12.
 */
import React from 'react'
import { Layout, Menu, Tabs, Form, Icon, Input, Checkbox, Button, Message } from 'antd'
import LoginTab from '../../components/LoginTab';
import RegisterTab from '../../components/RegisterTab';
const { Header, Content, Footer } = Layout
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class App extends React.Component {
    state = {
        confirmDirty: false
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    checkPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 14,
                    offset: 8,
                },
            },
        };
        return (
            <Layout className="layout">
                <Header>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">login</Menu.Item>
                        <Menu.Item key="2">article</Menu.Item>
                        <Menu.Item key="3">editor</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    <div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
                        <Tabs defaultActiveKey="2" size="small">
                            <TabPane tab="登录" key="1">
                                <LoginTab />
                            </TabPane>
                            <TabPane tab="注册" key="2">
                                <RegisterTab />
                            </TabPane>
                        </Tabs>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Node-Login ©2017 Created by linwalker
                </Footer>
            </Layout>
        )
    }
}

export default Form.create()(App);