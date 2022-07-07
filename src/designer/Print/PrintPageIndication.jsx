function PrintPageIndication({
    indexPageWidth,
    colPerPage,
    width,
    cellSizePrinting,
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
                    indexPageWidth * colPerPage +
                    (2 * width) / (5 * cellSizePrinting)
                }`}
                y={`${
                    indexPageHeight * rowPerPage +
                    height / (3 * cellSizePrinting)
                }`}
                fontSize={`${width / (20 * cellSizePrinting)}`}
                fill="darkGray"
            >
                {`Col ${indexPageWidth + 1}/${numPagesWidth}`}
            </text>
            <text
                x={`${
                    indexPageWidth * colPerPage +
                    (2 * width) / (5 * cellSizePrinting)
                }`}
                y={`${
                    indexPageHeight * rowPerPage +
                    (2 * height) / (3 * cellSizePrinting)
                }`}
                fontSize={`${width / (20 * cellSizePrinting)}`}
                fill="darkGray"
            >
                {`Row ${indexPageHeight + 1}/${numPagesHeight}`}
            </text>
        </>
    );
}

export default PrintPageIndication;
