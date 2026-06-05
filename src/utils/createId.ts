export const createId = (prefix = 'item') =>
  `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
