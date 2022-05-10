//This component is the pattern to be printed, at the right size
function PrintGrid({
    points,
    segments,
    curves,
    numColumns,
    numRows,
    cellSize,
}) {
    //That's the size of an A4 page
    const paperPageWidth = 21;
    const paperPageHeight = 29.7;

    //Maximum number of columns / rows which can be shown per page
    //(with no need to split the last one with the next page)
    const colPerPage = Math.floor(paperPageWidth / cellSize);
    const rowPerPage = Math.floor(paperPageHeight / cellSize);

    //The size the component will take on the page
    let width = colPerPage * cellSize;
    let height = rowPerPage * cellSize;

    //The number of pages required to cover the width / height of the pattern
    let numPagesWidth = Math.ceil(numColumns / colPerPage);
    let numPagesHeight = Math.ceil(numRows / rowPerPage);

    //A matrix of the pages to print
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
                {/*For each page, we create a SVG of the right size*/}

                {/*We draw the grid (here the columns) */}
                {[...Array(colPerPage).keys()].map((index) => (
                    <path
                        d={`M ${indexPageWidth * colPerPage + index} 
                              ${indexPageHeight * rowPerPage} 
                            L ${indexPageWidth * colPerPage + index} 
                              ${(indexPageHeight + 1) * rowPerPage} `}
                        fill="none"
                        stroke="gainsboro"
                        strokeWidth="0.1"
                        key={`printCol${index}page${indexPageHeight}${indexPageWidth}`}
                    ></path>
                ))}

                {/*We draw the grid (here the rows) */}
                {[...Array(rowPerPage).keys()].map((index) => (
                    <path
                        d={`M ${indexPageWidth * colPerPage} 
                              ${indexPageHeight * rowPerPage + index} 
                            L ${(indexPageWidth + 1) * colPerPage} 
                              ${indexPageHeight * rowPerPage + index} `}
                        fill="none"
                        stroke="gainsboro"
                        strokeWidth="0.1"
                        key={`printRow${index}page${indexPageHeight}${indexPageWidth}`}
                    ></path>
                ))}

                {/*We draw the outline */}
                <path
                    d={`M ${(indexPageWidth + 1) * colPerPage} 
                          ${indexPageHeight * rowPerPage} 
                        L ${(indexPageWidth + 1) * colPerPage} 
                          ${(indexPageHeight + 1) * rowPerPage} 
                        L ${indexPageWidth * colPerPage} 
                          ${(indexPageHeight + 1) * rowPerPage} `}
                    fill="none"
                    stroke="gainsboro"
                    strokeWidth="0.1"
                />

                {/*We draw the points */}
                {Object.entries(points).map(([, [positionX, positionY]]) => (
                    <circle
                        cx={positionX}
                        cy={positionY}
                        r="0.1"
                        key={`${positionX}${positionY}`}
                    ></circle>
                ))}

                {/*We draw the curves */}
                {Object.entries(curves).map(
                    ([key, [startPoint, endPoint, controlX, controlY]]) => (
                        <path
                            d={`M ${points[startPoint][0]} ${points[startPoint][1]} 
                                Q ${controlX} ${controlY} 
                                  ${points[endPoint][0]} 
                                  ${points[endPoint][1]}`}
                            fill="none"
                            stroke="black"
                            strokeWidth="0.1"
                            key={key}
                        ></path>
                    )
                )}

                {/*We draw the segments */}
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

                {/*We specify the place of the page among the other horzontally */}
                <text
                    x={`${indexPageWidth * colPerPage + (2 * width) / 5}`}
                    y={`${indexPageHeight * rowPerPage + height / 3}`}
                    fontSize={`${width / 20}`}
                    fill="darkGray"
                >
                    {`Col ${indexPageWidth + 1}/${numPagesWidth}`}
                </text>

                {/*We specify the place of the page among the other vertically */}
                <text
                    x={`${indexPageWidth * colPerPage + (2 * width) / 5}`}
                    y={`${indexPageHeight * rowPerPage + (2 * height) / 3}`}
                    fontSize={`${width / 20}`}
                    fill="darkGray"
                >
                    {`Row ${indexPageHeight + 1}/${numPagesHeight}`}
                </text>
            </svg>
        ))
    );
}

export { PrintGrid };
