import { Dispatch } from '@reduxjs/toolkit';
import { RegistryFilter, RegistryHistoryFilter } from 'src/interfaces/Filters';
import { DocRecord } from 'src/interfaces/services/models/Record';
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
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: `Помилка! ${error.data.error}`,
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
      .catch((error) => {
        dispatch(
          uiActions.showNotification({
            status: 'error',
            title: 'Error!',
            message: `Помилка! ${error.data.error}`,
          }),
        );
      });

export const createNewRegistry = (record: DocRecord) => (dispatch: Dispatch) =>
  RegistryService.createRegistry(record)
    .then((data) =>
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Документ було додано!',
        }),
      ),
    )
    .catch((error) => {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    });

export const updateRegistry = (record: DocRecord) => (dispatch: Dispatch) =>
  RegistryService.updateRegistry(record)
    .then((data) =>
      dispatch(
        uiActions.showNotification({
          status: 'success',
          title: 'Success!',
          message: 'Документ було змінено!',
        }),
      ),
    )
    .catch((error) => {
      console.log(error);

      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    });

export const getRegistryById =
  (id: number) =>
  async (dispatch: Dispatch): Promise<DocRecord | undefined> => {
    try {
      const res = await RegistryService.getRegistryById(id);
      return res;
    } catch (error: any) {
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: 'error',
          title: 'Error!',
          message: `Помилка! ${error.data.error}`,
        }),
      );
    }
  };
