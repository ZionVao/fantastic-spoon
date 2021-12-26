export class UserService {
  static async getAllUsers() {
    // get /registrator?page=&per_page=
    // get /admin?page=&per_page
  }

  static async getUserById(id: number) {
    // get /registrator/:id
    // get /admin/:id
  }

  static async createUser() {
    // post /registrator
    // post /admin
  }

  static async updateUser() {
    // put /registrator
    // put /admin
  }
  static async login() {
    // post /login
  }
}
