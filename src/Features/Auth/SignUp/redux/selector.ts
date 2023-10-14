import { RootState } from 'Store/index';

export const selectCountries = (state: RootState) => state.SignupReducer.countries;
export const selectCities = (state: RootState) => state.SignupReducer.cities;
export const selectStates = (state: RootState) => state.SignupReducer.states;