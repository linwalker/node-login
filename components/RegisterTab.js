/**
 * Created by linyuhua on 2017/5/15.
 */
import React from 'react'
import { Layout, Form, Icon, Input, Checkbox, Button, Message } from 'antd'
const { Header, Content, Footer } = Layout
import 'whatwg-fetch'
const FormItem = Form.Item;

class RegisterTab extends React.Component {
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
    handleSubmit = async (e) => {
        e.preventDefault();
        let values = await this.getFormValues();
        if (values) {
            console.log(values);
            fetch('/index/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(values)
            }).then(res => {
                res.json().then(res => {
                    console.log(res.success)
                })
            })

        }
    }
    getFormValues() {
        let self = this;
        return new Promise((resolve, reject) => {
            self.props.form.validateFields((err, values) => {
                if (!err) {
                    resolve( values );
                } else {
                    reject( false );
                }
            })
        })
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

        return(
            <div style={{ width: "450px", margin: "0 auto" }}>
                <Form onSubmit={this.handleSubmit}>
                    <FormItem
                        {...formItemLayout}
                        label="username"
                        hasFeedback
                    >
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Password"
                        hasFeedback
                    >
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: 'Please input your password!', whitespace: true },
                                {
                                    validator: this.checkConfirm,
                                }
                            ],
                        })(
                            <Input type="password"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Confirm Password"
                        hasFeedback
                    >
                        {getFieldDecorator('confirm', {
                            rules: [
                                { required: true, message: 'Please Confirm Password!', whitespace: true },
                                {
                                    validator: this.checkPassword
                                }
                            ],
                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="E-mail"
                        hasFeedback
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: 'The input is not valid E-mail!',
                            }, {
                                required: true, message: 'Please input your E-mail!',
                            }],
                        })(
                            <Input />
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
                        {getFieldDecorator('agreement', {
                            valuePropName: 'checked',
                        })(
                            <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                        )}
                    </FormItem>
                    <FormItem {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" size="large">Register</Button>
                    </FormItem>
                </Form>
            </div>
        )
    }
}

export default Form.create()(RegisterTab);