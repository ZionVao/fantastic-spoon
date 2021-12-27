import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserRole } from 'src/common/enums/app/role.enum';
import { User } from 'src/interfaces/services/models/User';
import { RootState } from 'src/store';

interface UserState {
  user: User | null;
  role: UserRole | null;
}

type UserContent = UserState;

const initialState: UserState = {
  user: null,
  role: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserContent>) => {
      state.user = action.payload.user;
      state.role = action.payload.role;
    },
  },
});

export const getUser = (state: RootState) => state.user;

export const userActions = userSlice.actions;

export const userReduser = userSlice.reducer;
