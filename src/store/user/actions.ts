import { Dispatch } from '@reduxjs/toolkit';
import { StorageKey } from 'src/common/enums/storage-key.enum';
import { UserService } from 'src/services/user/UserService';
import { uiActions } from 'src/store/ui/slice';
import { userActions } from './slice';

export const login =
  (request: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    try {
      const res = await UserService.login(request.email, request.password);
      console.log(res);
      localStorage.setItem(StorageKey.TOKEN, res.token);

      // const user = await UserService.getUserByToken();
      // localStorage.setItem(StorageKey.USER, JSON.stringify(user));

      //   dispatch(
      //     userActions.setUser({ user: user, role: getUserRole(user.id_role) }),
      //   );

      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: `Користувач увійшов`,
        }),
      );
    } catch (error) {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: 'Failed Login!',
        }),
      );
    }
  };

export const logout = () => (dispatch: Dispatch) => {
  localStorage.removeItem(StorageKey.TOKEN);
  localStorage.removeItem(StorageKey.USER);
  dispatch(userActions.setUser({ user: null, role: null }));
  dispatch(
    uiActions.showNotification({
      status: 'info',
      title: 'Logout',
      message: 'User logged out',
    }),
  );
};
