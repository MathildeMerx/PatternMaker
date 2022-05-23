const indexes = [...Array(26).keys()];

//An array of all letters in alphabetical order. It should be enough for a single
//pattern, I'll probably add more in the future to be safe
const pointNames = indexes.map((x) => String.fromCharCode(65 + x));

export default pointNames;
