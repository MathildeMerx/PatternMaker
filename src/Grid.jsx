import { useState, useRef, Fragment } from "react";
import { PatternPoint, deletePoint } from "./PointLogic/PatternPoint";
import { SegmentPath } from "./SegmentLogic/SegmentPath";
import { CurvePath } from "./CurveLogic/CurvePath";
import styled from "styled-components";
import { useTheme } from "styled-components";

//This grid will: 1) show on-screen the pattern the user is drafting;
//2) enable the user to modify parts of it (curves and points)
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
    //This theme will be used for the colors of the SVG points
    const theme = useTheme();

    //Ref for the drag'n'drop (specifies where the grid is positioned on screen)
    const SVGRef = useRef();

    //Arrays which will be used for the grid lines
    const arrWidth = [...Array(numColumns + 1).keys()];
    const arrHeight = [...Array(numRows + 1).keys()];

    //Width and height of the grid
    const width = numColumns * cellWidth;
    const height = numRows * cellHeight;

    //State specifying if someone is trying to delete a button belonging to a
    //segment / curve (and forbid it)
    const [deleteButton, setDeleteButton] = useState(false);

    //The position of the mouse is used for drag'n'drops
    const mousePositionRef = useRef([0, 0]);

    return (
        <S_DesignGrid width={width} height={height}>
            {/* These are the vertical lines of the grid. Each line in 5 has a legend */}
            {arrWidth.map((line) => (
                <Fragment key={`colFrag${line}`}>
                    <S_Column key={`col${line}`} left={line * cellWidth} />
                    {line % 5 === 0 ? (
                        <S_ColumnIndex
                            key={`col${line}index`}
                            left={line * cellWidth + (line === 5 ? 4 : 0)}
                        >
                            {line}
                        </S_ColumnIndex>
                    ) : null}
                </Fragment>
            ))}

            {/* These are the horizontal lines of the grid. Each line in 5 has a legend */}
            {arrHeight.map((line) => (
                <Fragment key={`rowFrag${line}`}>
                    <S_Row key={`row${line}`} top={line * cellHeight} />
                    {line % 5 === 0 ? (
                        <S_RowIndex
                            key={`row${line}index`}
                            right={width}
                            top={line * cellHeight}
                        >
                            {line}
                        </S_RowIndex>
                    ) : null}
                </Fragment>
            ))}

            {/*SVG of all the geometrical shapes of the pattern */}
            {/*When clicking in the SVG, it creates a new point */}
            {/*The mouse position in the grid is always recorded for drag'n'drops */}
            <svg
                ref={SVGRef}
                width={width}
                height={height}
                viewBox={`0 0 ${width} ${height} `}
                onMouseMove={(event) =>
                    (mousePositionRef.current = [event.clientX, event.clientY])
                }
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
                        fill={theme.colours.bright}
                    >
                        Click on this grid to create a point!
                    </text>
                ) : null}

                {/* Here all the segments are rendered in the grid */}
                {segments.map((seg) => (
                    <SegmentPath
                        key={seg[0] + seg[1]}
                        segment={seg}
                        points={points}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                    />
                ))}

                {/* Here all the curves are rendered in the grid */}
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
                            mousePositionRef={mousePositionRef}
                            key={index}
                        />
                    );
                })}
            </svg>

            {/* Here all the points are rendered in the grid */}
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
                            mousePositionRef={mousePositionRef}
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
        </S_DesignGrid>
    );
}

const S_Column = styled.div`
    background-color: ${({ theme }) => theme.colours.backgroundLight};
    height: 100%;
    left: ${(props) => props.left}px;
    position: absolute;
    top: 0;
    width: 1px;
    z-index: -1;
`;

const S_ColumnIndex = styled.div`
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 0.8em;
    left: ${(props) => props.left - 6}px;
    position: absolute;
    top: -8px;
`;

const S_DesignGrid = styled.div`
    cursor: pointer;
    width: ${(props) => props.width}px;
    margin: auto;
    position: relative;
    width: ${(props) => props.width}px;
`;

const S_Row = styled.div`
    background-color: ${({ theme }) => theme.colours.backgroundLight};
    height: 1px;
    left: 0;
    position: absolute;
    top: ${(props) => props.top}px;
    width: 100%;
    z-index: -1;
`;

const S_RowIndex = styled.div`
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 0.8em;
    position: absolute;
    right: ${(props) => props.right + 4}px;
    top: ${(props) => props.top}px;
`;

export { Grid };
