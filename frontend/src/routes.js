const basePath = '/api/v1';

const routes = {
  api: {
    loginPath: () => `${basePath}/login`,
    dataPath: () => `${basePath}/data`,
    signUpPath: () => `${basePath}/signup`,
  },
  rootPath: () => '/',
  loginPath: () => '/login',
  signupPath: () => '/signup',
};

export default routes;
