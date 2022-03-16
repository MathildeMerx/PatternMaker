import { useState } from "react";
import { PatternPoint, createNewPoint } from "./PatternPoint";
import "./App.css";
import { pointNames } from "./alphabet";
import { SegmentPath } from "./SegmentPath";
import { abscissa, ordinate } from "./coordinates";
import { pointExists } from "./pointExists";

function GridCell({
    numCellWidth,
    numCellHeight,
    numButton,
    existingPoints,
    setExistingPoints,
    gridSpacing,
    segments,
}) {
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);
    const arrWidth = [...Array(numCellWidth).keys()];
    const arrHeight = [...Array(numCellHeight).keys()];
    const arrButton = [...Array(numButton).keys()];
    const width = numCellWidth * gridSpacing;
    const height = numCellHeight * gridSpacing;

    return (
        <div
            className="design-grid"
            style={{
                width: `${numCellWidth * gridSpacing}px`,
                height: `${numCellHeight * gridSpacing}px`,
            }}
        >
            <svg
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
            </svg>
            {arrWidth.map((line) => (
                <div
                    key={line}
                    className="column"
                    style={{ left: `${(line + 1) * gridSpacing}px` }}
                />
            ))}
            {arrHeight.map((line) => (
                <div
                    key={line}
                    className="row"
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
        </div>
    );
}

export { GridCell };
