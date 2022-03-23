import { useState, useRef } from "react";
import { PatternPoint, createNewPoint } from "./PatternPoint";
import { pointNames } from "./alphabet";
import { SegmentPath } from "./SegmentPath";
import { abscissa, ordinate } from "./coordinates";
import { pointExists } from "./pointExists";
import { CurvePath } from "./CurvePath";
import styled from "styled-components";

function Grid({
    numCellWidth,
    numCellHeight,
    numButton,
    existingPoints,
    setExistingPoints,
    gridSpacing,
    segments,
    curves,
    setCurves,
}) {
    const SVGRef = useRef();
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);
    const arrWidth = [...Array(numCellWidth).keys()];
    const arrHeight = [...Array(numCellHeight).keys()];
    const arrButton = [...Array(numButton).keys()];
    const width = numCellWidth * gridSpacing;
    const height = numCellHeight * gridSpacing;

    return (
        <DesignGrid
            style={{
                width: `${numCellWidth * gridSpacing}px`,
                height: `${numCellHeight * gridSpacing}px`,
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
                    />
                ))}
                {curves.map((curve, index) => (
                    <CurvePath
                        curve={curve}
                        curveIndex={index}
                        existingPoints={existingPoints}
                        SVGRef={SVGRef}
                        setCurves={setCurves}
                        key={index}
                    />
                ))}
            </svg>
            {arrWidth.map((line) => (
                <Column
                    key={line}
                    style={{ left: `${(line + 1) * gridSpacing}px` }}
                />
            ))}
            {arrHeight.map((line) => (
                <Row
                    key={line}
                    style={{ top: `${(line + 1) * gridSpacing}px` }}
                />
            ))}
            {arrButton.map((index) => {
                const absc = abscissa(index, numCellHeight);
                const ord = ordinate(index, numCellHeight);
                return (
                    <PatternPoint
                        index={index}
                        key={index}
                        value={pointExists(absc, ord, existingPoints)}
                        numCellHeight={numCellHeight}
                        gridSpacing={gridSpacing}
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
    background-color: black;
    height: 100%;
    position: absolute;
    top: 0;
    width: 1px;
`;

const DesignGrid = styled.div`
    border: solid 1px;
    margin: auto;
    position: relative;
`;

const Row = styled.div`
    background-color: black;
    height: 1px;
    left: 0;
    position: absolute;
    width: 100%;
`;

export { Grid };
