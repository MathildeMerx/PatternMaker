import { useState, useRef } from "react";
import { PatternPoint, deletePoint } from "./PatternPoint";
import { SegmentPath } from "./SegmentPath";
import { CurvePath } from "./CurvePath";
import styled from "styled-components";

function Grid({
    numRows,
    numColumns,
    points,
    setPoints,
    cellHeight,
    cellWidth,
    possiblePointNames,
    setPossiblePointNames,
    segments,
    curves,
    setCurves,
    setAlertMessage,
}) {
    //Ref for the drag'n'drop
    const SVGRef = useRef();

    //Arrays for grid lines
    const arrWidth = [...Array(numColumns).keys()];
    const arrHeight = [...Array(numRows).keys()];
    const width = numColumns * cellWidth;
    const height = numRows * cellHeight;

    //To determine when someone is trying to delete a button belonging to a
    //segment / curve (and forbid it)
    const [deleteButton, setDeleteButton] = useState(false);

    return (
        <S_DesignGrid width={width} height={height}>
            {/*SVG of all the pattern geometrical shapes */}
            {/* When clicking in the SVG, it creates a new point */}
            <svg
                ref={SVGRef}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height} `}
                onClick={(event) => {
                    let pointName = possiblePointNames[0];
                    setPoints((points) => ({
                        ...points,
                        [pointName]: [
                            parseFloat(
                                (
                                    (event.clientX -
                                        event.target.getBoundingClientRect()
                                            .left) /
                                    cellWidth
                                ).toFixed(1)
                            ),

                            parseFloat(
                                (
                                    (event.clientY -
                                        event.target.getBoundingClientRect()
                                            .top) /
                                    cellHeight
                                ).toFixed(1)
                            ),
                        ],
                    }));
                    setPossiblePointNames((possiblePointNames) =>
                        possiblePointNames.slice(1)
                    );
                }}
            >
                {/* If there are no points tell the user they can
                click on the grid to create points */}
                {Object.keys(points).length === 0 ? (
                    <text
                        x={`${width / 20}`}
                        y={`${height / 3}`}
                        textLength={`${width * 0.9}`}
                        fontSize={`${width / 20}`}
                        fill="gainsboro"
                    >
                        Click on this grid to create a point!
                    </text>
                ) : null}
                {segments.map((seg) => (
                    <SegmentPath
                        key={seg[0] + seg[1]}
                        segment={seg}
                        points={points}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                    />
                ))}
                {Object.entries(curves).map(([index, curve]) => {
                    return (
                        <CurvePath
                            curve={curve}
                            curveIndex={index}
                            points={points}
                            SVGRef={SVGRef}
                            setCurves={setCurves}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            key={index}
                        />
                    );
                })}
            </svg>
            {Object.entries(points).map(
                ([pointName, [positionX, positionY]]) => {
                    return (
                        <PatternPoint
                            pointName={pointName}
                            cellWidth={cellWidth}
                            cellHeight={cellHeight}
                            positionX={positionX}
                            positionY={positionY}
                            SVGRef={SVGRef}
                            key={pointName}
                            setPoints={setPoints}
                            setDeleteButton={setDeleteButton}
                            onClick={() => {
                                deletePoint(
                                    pointName,
                                    setPoints,
                                    setPossiblePointNames,
                                    segments,
                                    curves,
                                    setAlertMessage,
                                    deleteButton,
                                    setDeleteButton
                                );
                            }}
                        />
                    );
                }
            )}
            {arrWidth.map((line) => (
                <S_Column key={line} left={(line + 1) * cellWidth} />
            ))}
            {arrHeight.map((line) => (
                <S_Row key={line} top={(line + 1) * cellHeight} />
            ))}
        </S_DesignGrid>
    );
}

const S_Column = styled.div`
    background-color: gainsboro;
    height: 100%;
    left: ${(props) => props.left}px;
    position: absolute;
    top: 0;
    width: 1px;
`;

const S_DesignGrid = styled.div`
    border: solid 1px gainsboro;
    width: ${(props) => props.width}px;
    margin: auto;
    position: relative;
    width: ${(props) => props.width}px;
`;

const S_Row = styled.div`
    background-color: gainsboro;
    height: 1px;
    left: 0;
    position: absolute;
    top: ${(props) => props.top}px;
    width: 100%;
`;

export { Grid };
