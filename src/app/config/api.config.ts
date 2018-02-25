
export const HOST: string = 'http://localhost:3000';
export const HEADERS: any = {
  client: 'client',
  secret: 'secret',
  username: 'username',
  token: 'access-token'
};
export const BACK_END_ROUTES: any = {
  user: {
    logout: 'users/logout',
    login: 'tokens/login',
    register: 'users/register',
    requestChangePassword: 'users/request-change-password',
    changePassword: 'users/change-password',
    updateProfile: 'users/update-profile'
  },
  library: {

  }
};