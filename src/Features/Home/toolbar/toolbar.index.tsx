import { useAppDispatch, useAppSelector } from "Store/hooks";
import { Button, Select } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { selectCities, selectCountries, selectStates } from "../redux/selector";
import { getAllCities, getAllStates } from "../redux/thunk";
import { ICity, ICountry, IState } from "../redux/types";
const { Option } = Select;

const Toolbar = ({
  state,
  city,
  setState,
  setCity,
  country,
  setSearchString,
  setCountry,
}: any) => {
  const dispatch = useAppDispatch();
  const countriesReducer = useAppSelector(selectCountries);
  const citiesReducer = useAppSelector(selectCities);
  const statesReducer = useAppSelector(selectStates);

  const [search, setSearch] = useState("");
  const onChangeCountry = (value: any) => {
    dispatch(getAllStates(value));
    setCountry(value);
    setState(null);
    setCity(null);
  };
  const onChangeState = (value: any) => {
    dispatch(getAllCities(value));
    setState(value);
    setCity(null);
  };
  const onChangeCity = (value: any) => {
    setCity(value);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          margin: "0.5rem",
          justifyContent: "flex-end",
        }}
      >
        <Select
          style={{ width: "200px", marginRight: "5px" }}
          onChange={onChangeCountry}
          value={country}
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
        <Select
          style={{ width: "200px", marginRight: "5px" }}
          value={state}
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
        <Select
          style={{ width: "200px", marginRight: "5px" }}
          value={city}
          onChange={onChangeCity}
          placeholder="Please select a city"
        >
          {citiesReducer.map((city: ICity) => {
            return (
              <Option key={city._id} value={city.name}>
                {city.name}
              </Option>
            );
          })}
        </Select>
        <Search
          value={search}
          onChange={(e: any) => {
            console.log(e.target.value);
            setSearch(e.target.value);
          }}
          placeholder="input search text"
          onSearch={() => {
            console.log(search);
            setSearchString(search);
          }}
          style={{ width: 200 }}
        />
        <Button
          onClick={() => {
            setSearch("");
            setSearchString("");
            setCountry(null);
            setState(null);
            setCity(null);
          }}
        >
          Reset Filters
        </Button>
      </div>
    </>
  );
};

export default Toolbar;
