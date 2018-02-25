import { ChangePasswordToken } from "./change-password-token.model";
import { Email } from "./email.model";

export interface LostPasswordToken {
  changePasswordToken: ChangePasswordToken;
  email: Email;
}