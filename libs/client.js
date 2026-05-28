import { createClient } from 'microcms-js-sdk';

export const client = process.env.API_KEY ? createClient({
    serviceDomain: 'hiragram',
    apiKey: process.env.API_KEY,
}) : null;
