import { StorageKey } from 'src/common/enums/storage-key.enum';
import { RegistryFilter, RegistryHistoryFilter } from 'src/interfaces/Filters';
import { HistoryRec } from 'src/interfaces/services/models/HistoryRec';
import { DocRecord } from 'src/interfaces/services/models/Record';
import { http } from 'src/services/http/HttpService';

export class RegistryService {
  static async getAllRegistry(
    filter: RegistryFilter,
  ): Promise<{ entities: DocRecord[]; count: number }> {
    // get /registry?page=&per_page=&type=&taxpayer=&date1=&date2=&fullname=
    return http.get<RegistryFilter, { entities: DocRecord[]; count: number }>(
      '/registry',
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
        params: {
          ...filter,
        },
      },
    );
  }

  static async getRegistryById(id: number, date?: Date): Promise<DocRecord> {
    // get /registry/:post_id?date
    return http.get<{ date: string }, DocRecord>(`/registry/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
      },
      params: {
        page: date?.toISOString(),
      },
    });
  }

  static async getRecordHistory(
    filter: RegistryHistoryFilter,
  ): Promise<{ entities: HistoryRec[]; count: number }> {
    // get /registry/:post_id/history?page=&per_page
    // get /registry/:post_id/history/:user_id?page=&per_page
    return http.get<
      { page: number; per_page: number },
      { entities: HistoryRec[]; count: number }
    >(
      `/registry/${filter.doc_id}/history${
        filter.user_id && `/${filter.user_id}`
      }`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
        params: {
          page: filter.page,
          per_page: filter.per_page,
        },
      },
    );
  }

  static async createRegistry(record: DocRecord, pass: string) {
    // post /registry
    return http.post<{ record: DocRecord }, number>(
      '/registry',
      { record },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
      },
    );
  }

  static async updateRegistry(record: DocRecord) {
    // put /registry
    return http.put<{ record: DocRecord }, number>(
      '/registry',
      { record },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
      },
    );
  }

  static async getRegistryByRegistratorId(
    id: number,
    filter?: { page: number; per_page: number },
  ) {
    // get /registrator/:id/created?page=&per_page
    return http.get<{ id: number }, { entities: DocRecord[]; count: number }>(
      `/registrator/${id}/created`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
        params: {
          ...filter,
        },
      },
    );
  }
}
