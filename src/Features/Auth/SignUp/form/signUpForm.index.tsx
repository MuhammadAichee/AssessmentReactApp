import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Card, Checkbox, Col, Form, Input, Row, Select } from "antd";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { setLoadingState } from "Components/loader/redux/slice";
import { useNavigate } from "react-router-dom";
import { selectCountries } from "../redux/selector";
import { ICountry, ISignUp } from "../redux/types";
import { signup } from "../redux/thunk";
const { Option } = Select;

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const countriesReducer = useAppSelector(selectCountries);
  const onFinish = (values: any) => {
    try {
      let { username, password, confirmPassword, email, country } = values;
      dispatch(setLoadingState(true));
      let signUpPayload: ISignUp = {
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        email: email,
        country: country,
      };
      dispatch(signup(signUpPayload)).unwrap().then((response:any)=>{
        dispatch(setLoadingState(false));
        alert(response);
        navigate("/")
      })
    } catch (err: any) {
      dispatch(setLoadingState(false));
    }
  };

  return (
    <Card title="Register User" bordered={true} style={{ width: "100% " }}>
      <Form
        className="signup-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout={"vertical"}
      >
        <Form.Item
          label={"User Name"}
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name={["email"]}
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <div style={{ display: "flex" }}>
          <Form.Item
            style={{ marginRight: "10px" }}
            label={"Password"}
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            label={"Confirm Password"}
            name="confirmPassword"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
        </div>
        <Form.Item
          name="country"
          label="Country"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select placeholder="Please select a Country">
            {countriesReducer.map((country: ICountry) => {
              return (
                <Option key={country.name} value={country.name}>
                  {country.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {/* <div style={{ display: "flex" }}>
          <Form.Item
            name="state"
            label="State"
            hasFeedback
            // rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select placeholder="Please select a state">
              {countriesReducer.map((country: ICountry) => {
                return (
                  <Option key={country._id} value={country._id}>
                    {country.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            hasFeedback
            // rules={[{ required: true, message: "Please select your City" }]}
          >
            <Select placeholder="Please select a city">
              {countriesReducer.map((country: ICountry) => {
                return (
                  <Option key={country._id} value={country._id}>
                    {country.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div> */}
        <Form.Item style={{ marginTop: "1.5rem" }}>
          <Button
            style={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUpForm;
