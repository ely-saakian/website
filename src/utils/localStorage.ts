export const cacheData = (
  storageKey: string,
  data: any,
  ttlInMilliseconds: number,
) => {
  const now = new Date();

  localStorage.setItem(
    storageKey,
    JSON.stringify({
      data: data,
      expires: now.getTime() + ttlInMilliseconds,
    }),
  );
};

export const getCachedData = (storageKey: string) => {
  const objectData = localStorage.getItem(storageKey);

  if (!objectData) {
    return null;
  }

  const { data, expires } = JSON.parse(objectData);
  const now = new Date();

  if (now.getTime() > expires) {
    localStorage.removeItem(storageKey);
    return null;
  }

  return data;
};
