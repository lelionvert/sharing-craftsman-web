import { Authorization } from "../models/authorization.model";

export class UserForm {
  constructor(
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public website: string,
    public github: string,
    public linkedin: string,
    public active: boolean,
    public isCreate: boolean,
    public authorizations?: Authorization
  ) {
    this.authorizations = {
      groups: [
        {
          name: 'USERS',
          roles: [{ name: 'ROLE_USER' }]
        }
      ]
    };
  }
}
