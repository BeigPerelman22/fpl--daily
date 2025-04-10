export const getFormattedDate = () => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date();
  return date.toLocaleDateString('en-US', options); // Format the date as "Month Day, Year"
};