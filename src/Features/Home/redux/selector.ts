import { RootState } from 'Store/index';

export const selectUsers = (state: RootState) => state.HomeReducer.users;