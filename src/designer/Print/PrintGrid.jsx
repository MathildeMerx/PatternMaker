import {
    NUM_CELLS_MAX,
    PAPER_PAGE_HEIGHT,
    PAPER_PAGE_WIDTH,
} from "../../Theme/constants";
import PrintColumn from "./PrintColumn";
import PrintCurvePath from "./PrintCurvePath";
import PrintPageIndication from "./PrintPageIndication";
import PrintPoint from "./PrintPoint";
import PrintRow from "./PrintRow";
import PrintSegmentPath from "./PrintSegmentPath";

//This component is the pattern to be printed, at the right size
function PrintGrid({ points, segments, curves, cellSizePrinting }) {
    //Maximum number of columns / rows which can be shown per page
    //(with no need to split the last one with the next page)
    const colPerPage = Math.floor(PAPER_PAGE_WIDTH / cellSizePrinting);
    const rowPerPage = Math.floor(PAPER_PAGE_HEIGHT / cellSizePrinting);

    //The size the component will take on the page
    let width = colPerPage * cellSizePrinting;
    let height = rowPerPage * cellSizePrinting;

    //The number of pages required to cover the width / height of the pattern
    let numPagesWidth = Math.ceil(NUM_CELLS_MAX / colPerPage);
    let numPagesHeight = Math.ceil(NUM_CELLS_MAX / rowPerPage);

    //A matrix of the pages to print
    let pages = Array(numPagesHeight).fill([...Array(numPagesWidth).keys()]);

    return pages.map((arr, indexPageHeight) =>
        arr.map((indexPageWidth) => (
            <svg
                //For each page, we create a SVG of the right size
                width={`${width}cm`}
                height={`${height}cm`}
                viewBox={`${indexPageWidth * colPerPage} ${
                    indexPageHeight * rowPerPage
                } ${colPerPage} ${rowPerPage} `}
                key={`${indexPageHeight}${indexPageWidth}`}
            >
                {/*We draw the grid (here the columns) */}
                {[...Array(colPerPage + 1).keys()].map((index) => (
                    <PrintColumn
                        indexPageWidth={indexPageWidth}
                        colPerPage={colPerPage}
                        indexPageHeight={indexPageHeight}
                        rowPerPage={rowPerPage}
                        index={index}
                        key={`printCol${index}page${indexPageHeight}${indexPageWidth}`}
                    />
                ))}

                {/*We draw the grid (here the rows) */}
                {[...Array(rowPerPage + 1).keys()].map((index) => (
                    <PrintRow
                        indexPageWidth={indexPageWidth}
                        colPerPage={colPerPage}
                        indexPageHeight={indexPageHeight}
                        rowPerPage={rowPerPage}
                        index={index}
                        key={`printRow${index}page${indexPageHeight}${indexPageWidth}`}
                    />
                ))}

                {/*We draw the points */}
                {Object.entries(points).map(([pointName, point]) => (
                    <PrintPoint point={point} key={pointName} />
                ))}

                {/*We draw the curves */}
                {Object.entries(curves).map(([key, curveData]) => (
                    <PrintCurvePath
                        curveData={curveData}
                        points={points}
                        key={key}
                    />
                ))}

                {/*We draw the segments */}
                {segments.map((seg) => (
                    <PrintSegmentPath key={seg} seg={seg} points={points} />
                ))}

                {/* Indication of the page row / column  to stick pattern pieces correctly*/}
                <PrintPageIndication
                    indexPageWidth={indexPageWidth}
                    colPerPage={colPerPage}
                    width={width}
                    cellSizePrinting={cellSizePrinting}
                    indexPageHeight={indexPageHeight}
                    rowPerPage={rowPerPage}
                    height={height}
                    numPagesWidth={numPagesWidth}
                    numPagesHeight={numPagesHeight}
                />
            </svg>
        ))
    );
}

export default PrintGrid;
