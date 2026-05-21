import NodeCache from 'node-cache';

const cache = new NodeCache({ stdTTL: 900, useClones: false });

export const set = (email, payload) => cache.set(email, payload);
export const get = (email) => cache.get(email);
export const del = (email) => cache.del(email);
