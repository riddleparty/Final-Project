import { Form, Icon, Input, Button, Checkbox } from 'antd';
import React, { Component } from "react";
import "./LoginScreen.css";
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";

const FormItem = Form.Item;

class NormalLoginForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        var retrievedObject = localStorage.getItem('registerdata');
        let saveData = JSON.parse(retrievedObject);
        console.log(saveData)
        this.props.form.validateFields((err, values) => {
            console.log(values)
            if (saveData.nickname == values.userName && saveData.password == values.password) {

                this.props.history.push("/Home");
            }
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='LoginWrapper'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
<span>  </span>
                        Or  <Link to={`/SignUp`}>   SignUp   </Link>
                        <div>
                            <Button type="primary" htmlType="submit" className="login-form-button" >
                                Log in
          </Button>
                        </div>
                    </FormItem>
                </Form>
            </div>
        );
    }
}


const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

export default withRouter(WrappedNormalLoginForm);
