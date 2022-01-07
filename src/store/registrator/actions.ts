import { Dispatch } from '@reduxjs/toolkit';
import { UserRole } from 'src/common/enums/app/role.enum';
import { UserFilter } from 'src/interfaces/Filters';
import { User } from 'src/interfaces/services/models/User';
import { UserService } from 'src/services/user/UserService';
import { uiActions } from 'src/store/ui/slice';
import { registrarActions } from './slice';

export const fetchRegistrarsData =
  (filter: UserFilter) => (dispatch: Dispatch) =>
    UserService.getAllUsers({ role: UserRole.REGISTRATOR, ...filter })
      .then((data) =>
        dispatch(
          registrarActions.serRegistors({
            registrars: data.entities,
            page: filter.page,
            count: filter.per_page,
            totalPages: Math.ceil(data.count / filter.per_page),
            totalCount: data.count,
          }),
        ),
      )
      .catch((error) => {
        console.log(error);
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Помилка',
          }),
        );
      });

export const createNewRegistrar =
  (record: User, pass: string) => (dispatch: Dispatch) =>
    UserService.createUser({
      role: UserRole.REGISTRATOR,
      pass: pass,
      user: record,
    })
      .then((data) =>
        dispatch(
          uiActions.showNotification({
            status: 'success',
            title: 'Success!',
            message: 'Реєстратора було додано!',
          }),
        ),
      )
      .catch((error: Error) => {
        console.log(error);

        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: `Виникла помилка при додаванні! \n${error.message}`,
          }),
        );
      });
