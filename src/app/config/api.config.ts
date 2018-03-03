'use strict';

export const HOST: string = 'http://localhost:3000';
export const HEADERS: any = {
  client: 'client',
  secret: 'secret',
  username: 'username',
  token: 'access-token',
  refreshToken: 'refresh-token'
};
export const BACK_END_ROUTES: any = {
  user: {
    logout: 'users/logout',
    login: 'tokens/login',
    register: 'users/register',
    requestChangePassword: 'users/request-change-password',
    changePassword: 'users/change-password',
    updateProfile: 'users/update-profile',
    requestLostPasswordToken: 'users/lost-password',
    changeLostPassword: 'users/change-lost-password',
    fileUpload: 'upload',
    refreshToken: 'tokens/refresh-token'
  },
  authorization: {
    roles: 'roles'
  },
  library: {
    categories: 'library/categories',
    knowledges: 'library/knowledges',
    deleteKnowledge: 'library/knowledges/delete',
    getCategories: 'library',
    searchCategories: 'library/search',
    comments: 'comments',
    deleteComment: 'comments/delete',
    getCommentsByContentId: 'comments/contentid',
    favorites: 'favorites',
    deleteFavorite: 'favorites/delete',
    getFavorites: 'favorites/search',
    scores: 'scores',
    deleteScore: 'scores/delete',
    getScoresByContentId: 'scores/contentId',
    getScoresByMark: 'scores/mark'
  }
};