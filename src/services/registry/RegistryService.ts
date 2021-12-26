export class RegistryService {
  static async getAllRegistry() {
    // get /registry?page=&per_page=&type=&taxpayer=&date1=&date2=&fullname=
  }

  static async getRegistryById(id: number) {
    // get /registry/:post_id?date
  }

  static async getRecordHistory() {
    // get /registry/:post_id/history?page=&per_page
    // get /registry/:post_id/history/:user_id?page=&per_page
  }

  static async createRegistry() {
    // post /registry
  }

  static async updateRegistry() {
    // put /registry
  }

  static async getRegistryByRegistratorId() {
    // get /registrator/:id/created?page=&per_page
  }
}
