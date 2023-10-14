import { useAppDispatch, useAppSelector } from "Store/hooks";
import { useEffect, useState } from "react";
import { getAllCountries, getAllUsersWithParams } from "./redux/thunk";
import { IGetUserParams } from "./redux/types";
import { setLoadingState } from "Components/loader/redux/slice";
import HomeTable from "./table/table.index";
import { selectIsModalOpen } from "./redux/selector";
import { Modal } from "antd";
import { setIsModalOpen } from "./redux/slice";
import Toolbar from "./toolbar/toolbar.index";

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>("");
  const [countrySelector, setCountrySelector] = useState<string | null>(null);
  const [citySelector, setCitySelector] = useState<string|null>(null);
  const [stateSelector, setStateSelector] = useState<string|null>(null);
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
        dispatch(setLoadingState(false));
      })
      .catch((err: any) => {
        dispatch(setLoadingState(false));
      });
  };
  const fetchCountries = () => {
    dispatch(getAllCountries());
  };
  useEffect(() => {
    fetchUsers();
    fetchCountries();
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [page, searchString, countrySelector,citySelector,stateSelector]);
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
      <HomeTable page={page} setPage={setPage} />
    </div>
  );
};

export default Home;
