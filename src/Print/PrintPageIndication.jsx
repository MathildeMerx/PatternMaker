function PrintPageIndication({
    indexPageWidth,
    colPerPage,
    width,
    cellSize,
    indexPageHeight,
    rowPerPage,
    height,
    numPagesWidth,
    numPagesHeight,
}) {
    return (
        <>
            <text
                x={`${
                    indexPageWidth * colPerPage + (2 * width) / (5 * cellSize)
                }`}
                y={`${indexPageHeight * rowPerPage + height / (3 * cellSize)}`}
                fontSize={`${width / (20 * cellSize)}`}
                fill="darkGray"
            >
                {`Col ${indexPageWidth + 1}/${numPagesWidth}`}
            </text>
            <text
                x={`${
                    indexPageWidth * colPerPage + (2 * width) / (5 * cellSize)
                }`}
                y={`${
                    indexPageHeight * rowPerPage + (2 * height) / (3 * cellSize)
                }`}
                fontSize={`${width / (20 * cellSize)}`}
                fill="darkGray"
            >
                {`Row ${indexPageHeight + 1}/${numPagesHeight}`}
            </text>
        </>
    );
}

export default PrintPageIndication;
