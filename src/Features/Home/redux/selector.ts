import { RootState } from 'Store/index';

export const selectCountries = (state: RootState) => state.SignupReducer.countries;