const indexes = [...Array(26).keys()];
const alphabet = indexes.map((x) => [x, String.fromCharCode(x + 65)]);
const alphabetObject = Object.fromEntries(alphabet);

export { alphabetObject };
