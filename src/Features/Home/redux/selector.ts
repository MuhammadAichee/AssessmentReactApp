import { RootState } from 'Store/index';

export const selectUsers = (state: RootState) => state.HomeReducer.users;
export const selectCurrentUsers = (state: RootState) => state.HomeReducer.selectedUser;
export const selectIsModalOpen = (state: RootState) => state.HomeReducer.isModelOpen;
export const selectCountries = (state: RootState) => state.HomeReducer.countries;
export const selectCities = (state: RootState) => state.HomeReducer.cities;
export const selectStates = (state: RootState) => state.HomeReducer.states;
export const selectCount = (state: RootState) => state.HomeReducer.count;