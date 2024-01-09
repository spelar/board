export const isEnvDev = (): boolean => {
  return Boolean(process.env.NODE_ENV === "development");
};

export const removeSpaces = (str: string) => {
  return str.replace(/\s/g, "");
};

export const formatShortCreatedAt = (createdAt: string) => {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const addZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  if (
    currentDate.getDate() === createdDate.getDate() &&
    currentDate.getMonth() === createdDate.getMonth() &&
    currentDate.getFullYear() === createdDate.getFullYear()
  ) {
    const hours = addZero(createdDate.getHours());
    const minutes = addZero(createdDate.getMinutes());
    return `${hours}:${minutes}`;
  } else {
    const day = addZero(createdDate.getDate());
    const month = addZero(createdDate.getMonth() + 1);
    const hours = addZero(createdDate.getHours());
    const minutes = addZero(createdDate.getMinutes());
    return `${month}/${day} ${hours}:${minutes}`;
  }
};

export const formatFullCreatedAt = (createdAt: string) => {
  const createdDate = new Date(createdAt);

  const addZero = (value: number) => (value < 10 ? `0${value}` : `${value}`);

  const day = addZero(createdDate.getDate());
  const month = addZero(createdDate.getMonth() + 1);
  const year = addZero(createdDate.getFullYear());
  const hours = addZero(createdDate.getHours());
  const minutes = addZero(createdDate.getMinutes());
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const getPathSegment = (index: number) => {
  const path = window.location.pathname;
  const segments = path.split("/").filter((segment) => segment.length > 0);

  return segments[index] || null;
};
