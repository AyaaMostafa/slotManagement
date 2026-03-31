import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'SlotManagement',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44313/',
    redirectUri: baseUrl,
    clientId: 'SlotManagement_App',
    responseType: 'code',
    scope: 'offline_access SlotManagement',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44313',
      rootNamespace: 'SlotManagement',
    },
  },
} as Environment;
