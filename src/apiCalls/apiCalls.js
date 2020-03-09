import request from 'request';

export const fetchQueues = () => request('/external/queues');

export const fetchShopifyRegistration = () => request('/external/shopify/registration');
