function PrintGrid({
    points,
    segments,
    curves,
    numColumns,
    numRows,
    colWidth,
    rowHeight,
    unit,
}) {
    let width = numColumns * colWidth * (unit === "cm" ? 1 : 2.54);
    let height = numRows * rowHeight * (unit === "cm" ? 1 : 2.54);

    let numPagesHeight = Math.floor(29.7 / height) + 1;
    let numPagesWidth = Math.floor(21 / width) + 1;

    let pages = Array(numPagesHeight).fill([...Array(numPagesWidth).keys]);

    pages.map((arr, indexPageHeight) =>
        arr.map((indexPageWidth) => (
            <svg
                width={`${width / numPagesWidth}cm`}
                height={`${height / numPagesHeight}cm`}
                viewBox={`${(indexPageWidth * width) / numPagesWidth} ${
                    (indexPageHeight * height) / numPagesHeight
                } ${((indexPageWidth + 1) * width) / numPagesWidth} ${
                    ((indexPageHeight + 1) * height) / numPagesHeight
                } `}
            ></svg>
        ))
    );
}

export { PrintGrid };
