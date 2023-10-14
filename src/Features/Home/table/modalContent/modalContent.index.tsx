import { setLoadingState } from "Components/loader/redux/slice";
import {
  selectCities,
  selectCountries,
  selectCurrentUsers,
  selectStates,
} from "Features/Home/redux/selector";
import { ICity, ICountry, IState, IUser } from "Features/Home/redux/types";
import { useAppDispatch, useAppSelector } from "Store/hooks";
import { Form, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import { getAllCities, getAllCountries, getAllStates } from "Features/Home/redux/thunk";
import { useEffect } from "react";

const ModalContent = ({formRef}:any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedUser = useAppSelector(selectCurrentUsers);

  const countriesReducer = useAppSelector(selectCountries);
  const citiesReducer = useAppSelector(selectCities);
  const statesReducer = useAppSelector(selectStates);
  
  const onChangeCountry = (value: any) => {
    dispatch(getAllStates(value));
    formRef.setFieldValue(["state","name"],"")
    formRef.setFieldValue(["city","name"],"")
};
  const onChangeState = (value: any) => {
    dispatch(getAllCities(value));
    formRef.setFieldValue(["city","name"],"")
  };
  useEffect(()=>{
    dispatch(getAllCountries())
  },[])
  const { Option } = Select;

  return (
    <>
      <Form.Item
        label={"User Name"}
        name="username"
        rules={[{ required: true, message: "Please input your Username!" }]}
      >
        <Input
          disabled
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        name={"email"}
        label="Email"
        rules={[{ type: "email", required: true }]}
      >
        <Input
          disabled
          prefix={<MailOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>
      <Form.Item
        name={["country", "name"]}
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
      <div style={{ display: "flex", width: "100%" }}>
        <Form.Item
          name={["state", "name"]}
          label="State"
          hasFeedback
          style={{ width: "100%", marginRight: "10px" }}
          rules={[{ required: true, message: "Please select your State!" }]}
        >
          <Select onChange={onChangeState} placeholder="Please select a state">
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
          name={["city", "name"]}
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
    </>
  );
};

export default ModalContent;
