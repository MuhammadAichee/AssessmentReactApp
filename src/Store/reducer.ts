import { combineReducers } from '@reduxjs/toolkit';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import LoaderReducer from "Components/loader/redux/slice" 

export interface IRootState {
  router: RouterState;
}

// Root Reducer
export default function RootReducer(history: History){
  const combinedReducer = combineReducers({
    router: connectRouter(history),
    LoaderReducer
  });

  return (state: any, action: any) => {
    return combinedReducer(state, action);
  };
};
