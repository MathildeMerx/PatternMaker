function PrintRow({
    indexPageWidth,
    colPerPage,
    indexPageHeight,
    rowPerPage,
    index,
}) {
    return (
        <path
            d={`M ${indexPageWidth * colPerPage} 
        ${indexPageHeight * rowPerPage + index} 
      L ${(indexPageWidth + 1) * colPerPage} 
        ${indexPageHeight * rowPerPage + index} `}
            fill="none"
            stroke="gainsboro"
            strokeWidth="0.05"
        ></path>
    );
}

export default PrintRow;
