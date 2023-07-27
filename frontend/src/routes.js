const basePath = '/api/v1';

export default {
  api: {
    loginPath: () => `${basePath}/login`,
    dataPath: () => `${basePath}//data`,
  },
  rootPath: () => '/',
  loginPath: () => '/login',
};