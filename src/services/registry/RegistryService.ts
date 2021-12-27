import { DocType } from 'src/common/enums/app/doc-type.enum';
import { RegistryFilter, RegistryHistoryFilter } from 'src/interfaces/Filters';
import { HistoryRec } from 'src/interfaces/services/models/HistoryRec';
import { DocRecord } from 'src/interfaces/services/models/Record';

export class RegistryService {
  static async getAllRegistry(filter: RegistryFilter): Promise<DocRecord[]> {
    // get /registry?page=&per_page=&type=&taxpayer=&date1=&date2=&fullname=
    return Promise.resolve([]);
  }

  static async getRegistryById(id: number, date?: Date): Promise<DocRecord> {
    // get /registry/:post_id?date

    return Promise.resolve({
      id: 1,
      type: DocType.INHAGR,
      blanks_numbers: 1,
      notarial_action_id: 1,
      sertificated_by: 1,
      sertificating_date: new Date().toString(),
      sertificating_place: {
        id: 1,
        country: 'country',
        line_1: 'street',
        line_2: 'house',
      },
      person: {
        id: 1,
        taxpayer_code: 'ind code',
        fullname: 'name',
        place_of_living: {
          id: 1,
          country: 'country',
          line_1: 'street',
          line_2: 'house',
        },
        place_of_birth: {
          id: 1,
          country: 'country',
          line_1: 'street',
          line_2: 'house',
        },
        date_of_birth: new Date().toString(),
      },
    });
  }

  static async getRecordHistory(
    filter: RegistryHistoryFilter,
  ): Promise<HistoryRec[]> {
    // get /registry/:post_id/history?page=&per_page
    // get /registry/:post_id/history/:user_id?page=&per_page
    return Promise.resolve([
      {
        edit: { person: { fullname: 'Anonimus Mark Anomov' } },
        time: 'Sat Dec 25 2021 21:10:40 GMT+0000 (Coordinated Universal Time)',
        user: { id: 1, name: 'Vasil Mulat Kulikovich' },
      },
    ]);
  }

  static async createRegistry(record: DocRecord) {
    // post /registry
  }

  static async updateRegistry() {
    // put /registry
  }

  static async getRegistryByRegistratorId() {
    // get /registrator/:id/created?page=&per_page
  }
}
