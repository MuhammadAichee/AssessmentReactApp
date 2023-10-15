import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Form, Input,message } from "antd";
import { ILogin } from "../redux/types";
import { useAppDispatch } from "Store/hooks";
import { postLogin } from "../redux/thunk";
import { setLoadingState } from "Components/loader/redux/slice";
import { useNavigate } from "react-router-dom";

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch()  
  const navigate = useNavigate()  
  const error = (description: string) => {
    message.error(description);
  };
  
  const onFinish = (values: any) => {
    dispatch(setLoadingState(true))
    let loginPayload : ILogin = {
        username : values.username,
        password : values.password
    }
    dispatch(postLogin(loginPayload)).unwrap().then((response:any)=>{
        const {username, token} = response
        localStorage.setItem("token",token)
        localStorage.setItem("username",username)
        dispatch(setLoadingState(false))
        navigate("/Home")
    }).catch((err:any)=>{
        console.log(err)
        error(err.message)
        dispatch(setLoadingState(false))
    })

  };

  return (
    <Card title="Login" bordered={false}>
      <Form
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Form.Item style={{marginTop:"1.5rem"}}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
        </Form.Item>
        Or <a onClick={()=>{navigate("/signup")}}>register now!</a>
      </Form>
    </Card>
  );
};

export default LoginForm;
