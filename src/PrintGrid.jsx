function PrintGrid({
    points,
    segments,
    curves,
    numColumns,
    numRows,
    cellSize,
}) {
    const paperPageWidth = 21;
    const paperPageHeight = 29.7;

    const colPerPage = Math.floor(paperPageWidth / cellSize);
    const rowPerPage = Math.floor(paperPageHeight / cellSize);

    let width = colPerPage * cellSize;
    let height = rowPerPage * cellSize;

    let numPagesWidth = Math.ceil(numColumns / colPerPage);
    let numPagesHeight = Math.ceil(numRows / rowPerPage);

    let pages = Array(numPagesHeight).fill([...Array(numPagesWidth).keys()]);

    return pages.map((arr, indexPageHeight) =>
        arr.map((indexPageWidth) => (
            <svg
                width={`${width}cm`}
                height={`${height}cm`}
                viewBox={`${indexPageWidth * colPerPage} ${
                    indexPageHeight * rowPerPage
                } ${colPerPage} ${rowPerPage} `}
                key={`${indexPageHeight}${indexPageWidth}`}
            >
                {[...Array(colPerPage).keys()].map((index) => (
                    <path
                        d={`M ${indexPageWidth * colPerPage + index} ${
                            indexPageHeight * rowPerPage
                        } L ${indexPageWidth * colPerPage + index} ${
                            (indexPageHeight + 1) * rowPerPage
                        } `}
                        fill="none"
                        stroke="gainsboro"
                        strokeWidth="0.1"
                        key={`printCol${index}page${indexPageHeight}${indexPageWidth}`}
                    ></path>
                ))}
                {[...Array(rowPerPage).keys()].map((index) => (
                    <path
                        d={`M ${indexPageWidth * colPerPage} ${
                            indexPageHeight * rowPerPage + index
                        } L ${(indexPageWidth + 1) * colPerPage} ${
                            indexPageHeight * rowPerPage + index
                        } `}
                        fill="none"
                        stroke="gainsboro"
                        strokeWidth="0.1"
                        key={`printRow${index}page${indexPageHeight}${indexPageWidth}`}
                    ></path>
                ))}
                <path
                    d={`M  ${(indexPageWidth + 1) * colPerPage} ${
                        indexPageHeight * rowPerPage
                    } L ${(indexPageWidth + 1) * colPerPage} ${
                        (indexPageHeight + 1) * rowPerPage
                    } L ${indexPageWidth * colPerPage} ${
                        (indexPageHeight + 1) * rowPerPage
                    } `}
                    fill="none"
                    stroke="gainsboro"
                    strokeWidth="0.1"
                />
                {Object.entries(points).map(([, [positionX, positionY]]) => (
                    <circle
                        cx={positionX}
                        cy={positionY}
                        r="0.1"
                        key={`${positionX}${positionY}`}
                    ></circle>
                ))}
                {Object.entries(curves).map(
                    ([key, [startPoint, endPoint, controlX, controlY]]) => (
                        <path
                            d={`M ${points[startPoint][0]} ${points[startPoint][1]} Q ${controlX} ${controlY} ${points[endPoint][0]} ${points[endPoint][1]}`}
                            fill="none"
                            stroke="black"
                            strokeWidth="0.1"
                            key={key}
                        ></path>
                    )
                )}

                {segments.map(([startPoint, endPoint]) => (
                    <path
                        d={`M ${points[startPoint][0]} ${points[startPoint][1]}
            L ${points[endPoint][0]} ${points[endPoint][1]}`}
                        fill="none"
                        stroke="black"
                        strokeWidth="0.1"
                        key={`${startPoint}${endPoint}`}
                    ></path>
                ))}
            </svg>
        ))
    );
}

export { PrintGrid };
