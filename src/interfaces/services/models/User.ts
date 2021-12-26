import { Passport } from './Passport';

export interface LongRegistrator {
  id?: number;
  fullname: string;
  email: string;
  date_of_birth: string;
  passport: Passport;
  organization: string;
  position: string;
  taxpayer_code: string;
}
