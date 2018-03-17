import { Authorization } from "./authorization.model";

export interface User {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  website: string;
  github: string;
  linkedin: string;
  authorizations: Authorization;
  creationDate: number;
  lastUpdateDate: number;
  picture: string;
  active: boolean;
}