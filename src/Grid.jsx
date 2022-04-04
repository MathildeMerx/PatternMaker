import { useState, useRef } from "react";
import { PatternPoint, createNewPoint } from "./PatternPoint";
import { pointNames } from "./alphabet";
import { SegmentPath } from "./SegmentPath";
import { abscissa, ordinate } from "./coordinates";
import { pointExists } from "./pointExists";
import { CurvePath } from "./CurvePath";
import styled from "styled-components";

function Grid({
    numRows,
    numColumns,
    numButton,
    existingPoints,
    setExistingPoints,
    cellHeight,
    cellWidth,
    segments,
    curves,
    setCurves,
    setAlertDeletePoint,
    setTestExistingPoints,
}) {
    const SVGRef = useRef();
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);
    const arrWidth = [...Array(numColumns).keys()];
    const arrHeight = [...Array(numRows).keys()];
    const arrButton = [...Array(numButton).keys()];
    const width = numColumns * cellWidth;
    const height = numRows * cellHeight;

    return (
        <S_DesignGrid
            style={{
                width: `${width}px`,
                height: `${height}px`,
            }}
        >
            <svg
                ref={SVGRef}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height} `}
                onClick={(event) => {
                    let pointName = possiblePointNames[0];
                    setExistingPoints((existingPoints) => ({
                        ...existingPoints,
                        [pointName]: [
                            parseFloat(
                                (
                                    (event.clientX -
                                        event.target.getBoundingClientRect()
                                            .left) /
                                    cellWidth
                                ).toFixed(2)
                            ),

                            parseFloat(
                                (
                                    (event.clientY -
                                        event.target.getBoundingClientRect()
                                            .top) /
                                    cellHeight
                                ).toFixed(2)
                            ),
                        ],
                    }));
                    setPossiblePointNames((possiblePointNames) =>
                        possiblePointNames.slice(1)
                    );
                }}
            >
                {Object.keys(existingPoints).length === 0 ? (
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
                        existingPoints={existingPoints}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                    />
                ))}
                {Object.entries(curves).map(([index, curve]) => {
                    return (
                        <CurvePath
                            curve={curve}
                            curveIndex={index}
                            existingPoints={existingPoints}
                            SVGRef={SVGRef}
                            setCurves={setCurves}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            key={index}
                        />
                    );
                })}
            </svg>
            {arrWidth.map((line) => (
                <S_Column
                    key={line}
                    style={{ left: `${(line + 1) * cellWidth}px` }}
                />
            ))}
            {arrHeight.map((line) => (
                <S_Row
                    key={line}
                    style={{ top: `${(line + 1) * cellHeight}px` }}
                />
            ))}
            {Object.entries(existingPoints).map(
                ([pointName, [positionX, positionY]]) => {
                    return (
                        <PatternPoint
                            pointName={pointName}
                            cellWidth={cellWidth}
                            cellHeight={cellHeight}
                            positionX={positionX}
                            positionY={positionY}
                            key={pointName}
                            onClick={() => {
                                createNewPoint(
                                    pointName,
                                    existingPoints,
                                    setExistingPoints,
                                    setPossiblePointNames,
                                    segments,
                                    curves,
                                    setAlertDeletePoint
                                );
                            }}
                        />
                    );
                }
            )}
        </S_DesignGrid>
    );
}

const S_Column = styled.div`
    background-color: gainsboro;
    height: 100%;
    position: absolute;
    top: 0;
    width: 1px;
`;

const S_DesignGrid = styled.div`
    border: solid 1px gainsboro;
    margin: auto;
    position: relative;
`;

const S_Row = styled.div`
    background-color: gainsboro;
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
`;

export { Grid };
