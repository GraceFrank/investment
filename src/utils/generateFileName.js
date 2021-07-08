import { nanoid } from 'nanoid';

export const generateFileName = (userId) => `${userId}_${nanoid()}`;
