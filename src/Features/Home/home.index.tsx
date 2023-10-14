import { useAppDispatch } from "Store/hooks";
import { useEffect, useState } from "react";
import { getAllUsers, getAllUsersWithParams } from "./redux/thunk";
import { IGetUserParams } from "./redux/types";
import { setLoadingState } from "Components/loader/redux/slice";

const Home = () => {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>("");
  const [countrySelector, setCountrySelector] = useState<string>("");
  const [citySelector, setCitySelector] = useState<string>("");
  const [stateSelector, setStateSelector] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>("username");
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
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
  }, []);
  return <div>Ahsan</div>;
};

export default Home;
