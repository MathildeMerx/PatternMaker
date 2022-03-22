function areArraysEqual(arr1, arr2) {
    let res = true;
    if (arr1.length !== arr2.length) {
        return false;
    } else {
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                res = false;
            }
        }
    }
    return res;
}

export { areArraysEqual };
