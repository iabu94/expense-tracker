export const currentShortMonth = () => {
  const today = new Date();
  return today.toLocaleString('en-US', { month: 'short' }).toLowerCase();
};
