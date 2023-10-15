import React from "react";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Select,
} from "antd";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { setLoadingState } from "Components/loader/redux/slice";
import { useNavigate } from "react-router-dom";
import { selectCities, selectCountries, selectStates } from "../redux/selector";
import { ICity, ICountry, ISignUp, IState } from "../redux/types";
import { getAllCities, getAllStates, signup } from "../redux/thunk";
const { Option } = Select;

const SignUpForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const countriesReducer = useAppSelector(selectCountries);
  const citiesReducer = useAppSelector(selectCities);
  const statesReducer = useAppSelector(selectStates);
  const success = () => {
    message.success("User created Successfully");
    navigate("/");
  };
  const error = (description: string) => {
    message.error(description);
  };
  const onFinish = (values: any) => {
    let { username, password, confirmPassword, email, country, state, city } =
      values;
    dispatch(setLoadingState(true));
    let signUpPayload: ISignUp = {
      username: username,
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      country: country,
      state: state,
      city: city,
    };
    dispatch(signup(signUpPayload))
      .unwrap()
      .then((response: any) => {
        dispatch(setLoadingState(false));
        success();
      })
      .catch((err: any) => {
        error(err.message);
        dispatch(setLoadingState(false));
      });
  };
  const onChangeCountry = (value: any) => {
    dispatch(getAllStates(value));
    form.setFieldValue("state",null);
    form.setFieldValue("city",null);
  };
  const onChangeState = (value: any) => {
    dispatch(getAllCities(value));
    form.setFieldValue("city",null);
  };
  const passwordValue = Form.useWatch("password", form);
  return (
    <Card title="Register User" bordered={true} style={{ width: "100%" }}>
      <Form
        className="signup-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout={"vertical"}
        form={form}
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
            rules={[
              {
                required: true,
                validator(_, value) {
                  if (!value) {
                    return Promise.reject(
                      new Error("Please enter Confirm Password")
                    );
                  } else if (value && value !== passwordValue) {
                    return Promise.reject(
                      new Error("Password and confirm password does not match")
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
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
          <Select
            onChange={onChangeCountry}
            placeholder="Please select a Country"
          >
            {countriesReducer.map((country: ICountry) => {
              return (
                <Option key={country.name} value={country.name}>
                  {country.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <div className="state-country-div">
          <Form.Item
            name="state"
            label="State"
            hasFeedback
            className="state-form-item-div"
            rules={[{ required: true, message: "Please select your State!" }]}
>
            <Select
              onChange={onChangeState}
              placeholder="Please select a state"
            >
              {statesReducer.map((state: IState) => {
                return (
                  <Option key={state._id} value={state.name}>
                    {state.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item
            name="city"
            label="City"
            hasFeedback
            style={{ width: "100%" }}
            rules={[{ required: true, message: "Please select your City" }]}
          >
            <Select placeholder="Please select a city">
              {citiesReducer.map((city: ICity) => {
                return (
                  <Option key={city._id} value={city.name}>
                    {city.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </div>
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
        <a onClick={()=>{navigate("/")}}>back to Login</a>

      </Form>
    </Card>
  );
};

export default SignUpForm;
