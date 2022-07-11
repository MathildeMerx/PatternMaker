const indexes = [...Array(26).keys()];

//An array of all letters in alphabetical order. It should be enough for a single
//pattern, I'll probably add more in the future to be safe
const pointNames = indexes
    .flatMap(
        (x) =>
            [...Array(11).keys()].map(
                (y) => String.fromCharCode(65 + x) + (y === 10 ? "" : y)
            ),
        2
    )
    .sort((a, b) => {
        if (a.length === b.length) {
            if (a[0] === b[0] || a.length === 1) {
                return a < b ? -1 : 1;
            }
            return a[1] < b[1] ? -1 : 1;
        }
        return a.length < b.length ? -1 : 1;
    });
export default pointNames;
