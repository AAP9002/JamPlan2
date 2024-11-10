export const getSessionUserIdClient = () => {
  const cookies = document.cookie
    .split('; ')
    .find((row) => row.startsWith('user='));
  return cookies ? cookies.split('=')[1] : null;
};

export const setSessionUserIdClient = (userId: string) => {
  document.cookie = `user=${userId}; path=/; secure; samesite=strict`;
};

export const deleteSessionUserIdClient = () => {
  document.cookie = `user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; secure; samesite=strict`;
};