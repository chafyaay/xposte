import { Role } from '__src/app/@shared';

export interface UserAccount {
  id?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  email?: string;
  createdDate?: Date;
  updatedDate?: Date;
  roles: Role[];
}
