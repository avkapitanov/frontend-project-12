const basePath = '/api/v1';

export default {
  api: {
    loginPath: () => `${basePath}/login`,
    dataPath: () => `${basePath}/data`,
    signUpPath: () => `${basePath}/signup`,
  },
  rootPath: () => '/',
  loginPath: () => '/login',
  signupPath: () => '/signup',
};