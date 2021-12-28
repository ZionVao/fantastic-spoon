// import { Role } from "src/common/enums/app/role.enum";
import { User } from 'src/interfaces/services/models/User';
import { UserRole } from 'src/common/enums/app/role.enum';
import { http } from 'src/services/http/HttpService';
import { StorageKey } from 'src/common/enums/storage-key.enum';

interface getUserArgs {
  role: UserRole;
  page?: number;
  per_page?: number;
  created_by?: number;
}

interface getUserByIdArgs {
  role: UserRole;
  id: number;
}

interface createUserArgs {
  role: UserRole;
  user: User;
  pass: string;
}

interface updateUserArgs {
  role: UserRole;
  user: User;
  pass?: string;
}

export class UserService {
  static async getAllUsers(args: getUserArgs) {
    let link = '/' + args.role;
    if (args.created_by) {
      link += '/' + args.created_by + '/created';
    }
    let token = localStorage.getItem('token');
    if (!token) token = '';
    return http.get<{ page?: number; per_page?: number }, User[]>(link, {
      headers: {
        authorization: token,
      },
      params: {
        page: args.page,
        per_page: args.per_page,
      },
    });

    // get /registrator?page=&per_page=
    // get /admin?page=&per_page
  }

  static async getUserById(args: getUserByIdArgs) {
    const link = '/' + args.role + '/' + args.id;
    let token = localStorage.getItem('token');
    if (!token) token = '';
    return http.get<null, User>(link, {
      headers: {
        authorization: token,
      },
    });
    // get /registrator/:id
    // get /admin/:id
  }

  static async createUser(args: createUserArgs) {
    let token = localStorage.getItem('token');
    if (!token) token = '';

    const link = '/' + args.role;
    if (args.role === UserRole.REGISTRATOR) {
      const req = {
        registrator: args.user,
        pass: args.pass,
      };
      return http.post<{ registrator: User; pass: string }, number>(link, req, {
        headers: {
          authorization: token,
        },
      });
    } else {
      const req = {
        admin: args.user,
        pass: args.pass,
      };
      return http.post<{ admin: User; pass: string }, number>(link, req, {
        headers: {
          authorization: token,
        },
      });
    }

    // post /registrator
    // post /admin
  }

  static async updateUser(args: updateUserArgs) {
    if (args.role !== UserRole.REGISTRATOR) throw new Error('Неправильна роль');
    return http.put<{ registrator: User; pass?: string }, number>(
      `/${args.role}`,
      {
        registrator: args.user,
        pass: args.pass,
      },
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem(StorageKey.TOKEN)}`,
        },
      },
    );

    // put /registrator
    // put /admin
  }
  static async login(email: string, pass: string) {
    const res = await http.post<
      { email: string; pass: string },
      { token: string; user: { id: number; role: UserRole } }
    >('/login', { email, pass });
    console.log(res);
    return res;
  }
}
