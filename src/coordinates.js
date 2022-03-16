function abscissa(index, numCellHeight) {
    return Math.floor(index / (numCellHeight - 1)) + 1;
}

function ordinate(index, numCellHeight) {
    return (index % (numCellHeight - 1)) + 1;
}

export { abscissa, ordinate };
