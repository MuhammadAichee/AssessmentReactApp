import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import LoaderReducer from "Components/loader/redux/slice" 
import SignupReducer from "Features/Auth/SignUp/redux/slice"
import HomeReducer from "Features/Home/redux/slice"
export interface IRootState {
  router: RouterState;
}

// Root Reducer
export default function RootReducer(history: History){
  const combinedReducer = combineReducers({
    router: connectRouter(history),
    LoaderReducer,
    SignupReducer,
    HomeReducer
  });

  return (state: any, action: any) => {
    return combinedReducer(state, action);
  };
};
