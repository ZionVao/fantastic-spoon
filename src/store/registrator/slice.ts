import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'src/interfaces/services/models/User';
import { RootState } from 'src/store';

interface RegistrarState {
  registrars: User[];
  page: number;
  count: number;
  totalPages: number;
  totalCount: number;
}

const initialState: RegistrarState = {
  registrars: [],
  page: 1,
  count: 10,
  totalPages: 1,
  totalCount: 0,
};

type RegistrarContent = RegistrarState;

const registorSlice = createSlice({
  name: 'registrar',
  initialState,
  reducers: {
    setRegistors: (state, action: PayloadAction<RegistrarContent>) => {
      state.registrars = action.payload.registrars;
      state.page = action.payload.page;
      state.count = action.payload.count;
      state.totalPages = action.payload.totalPages;
      state.totalCount = action.payload.totalCount;
      console.log('qwerty', state);
    },
  },
});

export const registrarActions = registorSlice.actions;

export const registrarReducer = registorSlice.reducer;

export const loadRegistrars = (state: RootState) => state.registrar;
