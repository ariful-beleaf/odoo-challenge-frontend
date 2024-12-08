export const convertLocalToUTC = (localDateTime: string) => {
  // Create a date object from the local datetime string
  const date = new Date(localDateTime);

  // Get UTC components
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const seconds = String(date.getUTCSeconds()).padStart(2, "0");

  // Return formatted string
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
