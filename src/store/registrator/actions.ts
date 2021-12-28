import { Dispatch } from '@reduxjs/toolkit';
import { UserRole } from 'src/common/enums/app/role.enum';
import { UserFilter } from 'src/interfaces/Filters';
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
