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
}) {
    const SVGRef = useRef();
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);
    const arrWidth = [...Array(numColumns).keys()];
    const arrHeight = [...Array(numRows).keys()];
    const arrButton = [...Array(numButton).keys()];
    const width = numColumns * cellWidth;
    const height = numRows * cellHeight;

    return (
        <DesignGrid
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
            >
                {segments.map((seg) => (
                    <SegmentPath
                        key={seg[0] + seg[1]}
                        segment={seg}
                        existingPoints={existingPoints}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                    />
                ))}
                {curves.map((curve, index) => {
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
                <Column
                    key={line}
                    style={{ left: `${(line + 1) * cellWidth}px` }}
                />
            ))}
            {arrHeight.map((line) => (
                <Row
                    key={line}
                    style={{ top: `${(line + 1) * cellHeight}px` }}
                />
            ))}
            {arrButton.map((index) => {
                const absc = abscissa(index, numRows);
                const ord = ordinate(index, numRows);
                return (
                    <PatternPoint
                        index={index}
                        key={index}
                        value={pointExists(absc, ord, existingPoints)}
                        numRows={numRows}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                        onClick={() => {
                            createNewPoint(
                                absc,
                                ord,
                                existingPoints,
                                setExistingPoints,
                                possiblePointNames,
                                setPossiblePointNames,
                                segments
                            );
                        }}
                    />
                );
            })}
        </DesignGrid>
    );
}

const Column = styled.div`
    background-color: gainsboro;
    height: 100%;
    position: absolute;
    top: 0;
    width: 1px;
`;

const DesignGrid = styled.div`
    border: solid 1px gainsboro;
    margin: auto;
    position: relative;
`;

const Row = styled.div`
    background-color: gainsboro;
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
`;

export { Grid };
