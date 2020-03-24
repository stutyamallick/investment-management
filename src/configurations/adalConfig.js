import { AuthenticationContext, adalFetch, withAdalLogin } from 'react-adal';
 
export const adalConfig = {
  tenant: '72446be9-a454-4bfa-87d4-8cf4f6eaaf39',
  clientId: 'd7a9d530-de07-473e-aa57-44770c6df0e2',
  endpoints: {
    api: 'https://STREAMREALTY.onmicrosoft.com/TestAPI',
  },
  cacheLocation: 'localStorage',
};
 
export const authContext = new AuthenticationContext(adalConfig);
 
export const adalApiFetch = (fetch, url, options) =>
  adalFetch(authContext, adalConfig.endpoints.api, fetch, url, options);
 
export const withAdalLoginApi = withAdalLogin(authContext, adalConfig.endpoints.api);
