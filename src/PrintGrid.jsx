function PrintGrid({
    points,
    segments,
    curves,
    numColumns,
    numRows,
    colWidth,
    rowHeight,
}) {
    const paperPageWidth = 21;
    const paperPageHeight = 29.7;

    let width = numColumns * colWidth;
    let height = numRows * rowHeight;

    let numPagesWidth = Math.ceil(width / paperPageWidth);
    let numPagesHeight = Math.ceil(height / paperPageHeight);

    let pages = Array(numPagesHeight).fill([...Array(numPagesWidth).keys()]);

    return pages.map((arr, indexPageHeight) =>
        arr.map((indexPageWidth) => (
            <svg
                width={`${Math.floor(paperPageWidth / colWidth) * colWidth}cm`}
                height={`${
                    Math.floor(paperPageHeight / rowHeight) * rowHeight
                }cm`}
                viewBox={`${
                    indexPageWidth * Math.floor(paperPageWidth / colWidth)
                } ${
                    indexPageHeight * Math.floor(paperPageHeight / rowHeight)
                } ${Math.floor(paperPageWidth / colWidth)} ${Math.floor(
                    paperPageHeight / rowHeight
                )} `}
                key={`${indexPageHeight}${indexPageWidth}`}
            >
                <path
                    d={`M  ${
                        (indexPageWidth + 1) *
                        Math.floor(paperPageWidth / colWidth)
                    } 0 L ${
                        (indexPageWidth + 1) *
                        Math.floor(paperPageWidth / colWidth)
                    } ${
                        (indexPageHeight + 1) *
                        Math.floor(paperPageHeight / rowHeight)
                    } L 0 ${
                        (indexPageHeight + 1) *
                        Math.floor(paperPageHeight / rowHeight)
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
