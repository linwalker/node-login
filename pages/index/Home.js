/**
 * Created by linyuhua on 2017/5/12.
 */
import React from 'react'
import { Layout, Menu, Tabs, Form, Icon, Input, Checkbox, Button } from 'antd'

const { Header, Content, Footer } = Layout
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
class App extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;

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
                        <Tabs defaultActiveKey="1" size="small">
                            <TabPane tab="登录" key="1">
                                <div style={{ width: "280px", margin: "0 auto" }}>
                                    <Form  className="login-form">
                                        <FormItem>
                                            {getFieldDecorator('userName', {
                                                rules: [{ required: true, message: '请您输入账号名称！' }],
                                            })(
                                                <Input addonBefore={<Icon type="user" />} placeholder="请您输入用户名称！" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('password', {
                                                rules: [{ required: true, message: '请您输入账号密码！' }],
                                            })(
                                                <Input addonBefore={<Icon type="lock" />} type="password" placeholder="请您输入账号密码" />
                                            )}
                                        </FormItem>
                                        <FormItem>
                                            {getFieldDecorator('remember', {
                                                valuePropName: 'checked',
                                                initialValue: true,
                                            })(
                                                <Checkbox>记住登录</Checkbox>
                                            )}
                                            <a className="login-form-forgot">忘记密码</a><br/>
                                            <Button type="primary" htmlType="submit" className="login-form-button">
                                                确定
                                            </Button>
                                        </FormItem>
                                    </Form>
                                </div>
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