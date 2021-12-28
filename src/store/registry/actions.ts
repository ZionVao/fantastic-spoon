import { Dispatch } from '@reduxjs/toolkit';
import { RegistryFilter, RegistryHistoryFilter } from 'src/interfaces/Filters';
import { RegistryService } from 'src/services/registry/RegistryService';
import { uiActions } from 'src/store/ui/slice';
import { registryActions } from './slice';

export const fetchRegistryData =
  (filter: RegistryFilter) => (dispatch: Dispatch) =>
    RegistryService.getAllRegistry(filter)
      .then((data) =>
        dispatch(
          registryActions.setRegistries({
            records: data.entities,
            page: filter.page,
            count: filter.per_page,
            totalPages: Math.ceil(data.count / filter.per_page),
            totalCount: data.count,
          }),
        ),
      )
      .catch(() => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Помилка',
          }),
        );
      });

export const fetchRegistryHistoryData =
  (filter: RegistryHistoryFilter) => (dispatch: Dispatch) =>
    RegistryService.getRecordHistory(filter)
      .then((data) =>
        dispatch(
          registryActions.setHistory({
            docId: filter.doc_id,
            history: data.entities,
            page: filter.page,
            count: filter.per_page,
            totalCount: data.count,
            totalPages: Math.ceil(data.count / filter.per_page),
          }),
        ),
      )
      .catch(() => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: 'Помилка',
          }),
        );
      });
