function PrintColumn({
    indexPageWidth,
    colPerPage,
    indexPageHeight,
    rowPerPage,
    index,
}) {
    return (
        <path
            d={`M ${indexPageWidth * colPerPage + index} 
          ${indexPageHeight * rowPerPage} 
        L ${indexPageWidth * colPerPage + index} 
          ${(indexPageHeight + 1) * rowPerPage} `}
            fill="none"
            stroke="gainsboro"
            strokeWidth="0.05"
        ></path>
    );
}

export default PrintColumn;
