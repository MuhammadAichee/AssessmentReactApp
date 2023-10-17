import { useAppDispatch, useAppSelector } from "Store/hooks";
import { useEffect, useState } from "react";
import {
  getAllCities,
  getAllCountries,
  getAllStates,
  getAllUsersWithParams,
} from "./redux/thunk";
import { IGetUserParams } from "./redux/types";
import { setLoadingState } from "Components/loader/redux/slice";
import HomeTable from "./table/table.index";
import { selectIsModalOpen } from "./redux/selector";
import { Modal } from "antd";
import { setIsModalOpen } from "./redux/slice";
import Toolbar from "./toolbar/toolbar.index";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchString, setSearchString] = useState<string | null>("");
  const [countrySelector, setCountrySelector] = useState<string | null>(null);
  const [citySelector, setCitySelector] = useState<string | null>(null);
  const [stateSelector, setStateSelector] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("username");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  const fetchUsers = () => {
    dispatch(setLoadingState(true));
    let queryPayload: IGetUserParams = {
      search: searchString,
      country: countrySelector,
      city: citySelector,
      state: stateSelector,
      page: page,
      limit: limit,
      sortBy: sortBy,
      sortOrder: sortOrder,
    };
    dispatch(getAllUsersWithParams(queryPayload))
      .unwrap()
      .then(() => {
        navigate(
          `/Home?search=${
            searchString ?? ""
          }&page=${page}&limit=${limit}&sortBy=${sortBy}&sortOrder=${sortOrder}&country=${
            countrySelector ?? ""
          }&city=${citySelector ?? ""}&state=${stateSelector ?? ""}`
        );
        dispatch(setLoadingState(false));
      })
      .catch((err: any) => {
        dispatch(setLoadingState(false));
      });
  };
  const fetchCountries = () => {
    dispatch(getAllCountries());
  };

  const paramMappings = {
    search: setSearchString,
    page: (value: any) => setPage(parseInt(value)),
    limit: (value: any) => setLimit(parseInt(value)),
    country: (value: any) => {
      setCountrySelector(value);
      dispatch(getAllStates(value));
    },
    city: (value: any) => setCitySelector(value),
    state: (value: any) => {
      setStateSelector(value);
      dispatch(getAllCities(value));
    },
    sortBy: setSortBy,
    sortOrder: setSortOrder,
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);

    for (const [param, setter] of Object.entries(paramMappings)) {
      const value = queryParams.get(param);
      if (value) {
        setter(value);
      }
    }

    fetchUsers();
    fetchCountries();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [
    page,
    searchString,
    countrySelector,
    citySelector,
    stateSelector,
    sortBy,
    sortOrder,
  ]);
  return (
    <div>
      <Toolbar
        country={countrySelector}
        setSearchString={setSearchString}
        setCountry={setCountrySelector}
        city={citySelector}
        setCity={setCitySelector}
        state={stateSelector}
        setState={setStateSelector}
      />
      <HomeTable
        page={page}
        setSortBy={setSortBy}
        setSortOrder={setSortOrder}
        setPage={setPage}
      />
    </div>
  );
};

export default Home;
