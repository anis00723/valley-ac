// if the string is empty, return empty string
// if the string is all uppercase or lowercase, return the string capitalized
export const capitalize = (str: string) => {
  if (!str) return '';
  if (str.toUpperCase() === str)
    return str.charAt(0).toUpperCase() + str.slice(1).toLocaleLowerCase();
  return str.charAt(0).toUpperCase() + str.slice(1);
};
