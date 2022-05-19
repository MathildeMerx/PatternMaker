import { useRef, useState } from "react";
import PatternPoint from "./PointLogic/PatternPoint";
import SegmentPath from "./SegmentLogic/SegmentPath";
import CurvePath from "./CurveLogic/CurvePath";
import styled from "styled-components";
import Column from "./Column";
import Row from "./Row";
import NoPointText from "./NoPointText";
import {
    PointBelongsCurve,
    PointBelongsSegment,
} from "./PointLogic/pointBelongsGeo";

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
    //Ref for the drag'n'drop (specifies where the grid is positioned on screen)
    const SVGRef = useRef();

    //Arrays which will be used for the grid lines
    const arrWidth = [...Array(numColumns + 1).keys()];
    const arrHeight = [...Array(numRows + 1).keys()];

    //Width and height of the grid
    const width = numColumns * cellWidth;
    const height = numRows * cellHeight;

    //The position of the mouse is used for drag'n'drops
    const mousePositionRef = useRef([0, 0]);

    function mousePositionToCoordinate(
        mousePosition,
        parentPosition,
        cellDimension
    ) {
        return parseFloat(
            ((mousePosition - parentPosition) / cellDimension).toFixed(1)
        );
    }

    // When onMouseUp the button is at the same place as it was onMouseDown,
    // it means the user wants to delete it. `deletingButton` then becomes true.
    const [deletingButton, setDeletingButton] = useState(false);

    function onClickPoint(pointName) {
        // When onMouseUp the button is at the same place as it was onMouseDown,
        // it means the user wants to delete it. `deletingButton` then becomes true.
        // Before deleting a point, we check whether it belongs to a segment / curve
        if (deletingButton) {
            const pointInSegment = PointBelongsSegment(
                segments,
                pointName,
                setAlertMessage
            );
            const pointInCurve = PointBelongsCurve(
                curves,
                pointName,
                setAlertMessage
            );

            if (!pointInSegment && !pointInCurve) {
                // If the point doesn't belong to anything, it is deleted
                setPoints((points) => {
                    const { [pointName]: val, ...rest } = points;
                    return rest;
                });

                // The name of the point deleted is returned to available point names
                setPossiblePointNames((possiblePointNames) => {
                    return [...possiblePointNames, pointName].sort();
                });
            }
            setDeletingButton(false);
        }
    }

    function createNewPoint(event) {
        let pointName = possiblePointNames[0];
        setPoints((points) => ({
            ...points,
            [pointName]: [
                mousePositionToCoordinate(
                    event.clientX,
                    event.target.getBoundingClientRect().left,
                    cellWidth
                ),
                mousePositionToCoordinate(
                    event.clientY,
                    event.target.getBoundingClientRect().top,
                    cellHeight
                ),
            ],
        }));
        setPossiblePointNames((possiblePointNames) =>
            possiblePointNames.slice(1)
        );
    }

    return (
        <S_DesignGrid width={width} height={height}>
            {/* These are the vertical lines of the grid. Each line in 5 has a legend */}
            {arrWidth.map((line) => (
                <Column key={`col${line}`} line={line} cellWidth={cellWidth} />
            ))}

            {/* These are the horizontal lines of the grid. Each line in 5 has a legend */}
            {arrHeight.map((line) => (
                <Row
                    key={`row${line}`}
                    line={line}
                    cellHeight={cellHeight}
                    width={width}
                />
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
                onClick={(event) => createNewPoint(event)}
            >
                {/* If there are no points tell the user they can
                click on the grid to create points */}
                {Object.keys(points).length === 0 ? (
                    <NoPointText width={width} height={height} />
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
                            mousePositionRef={mousePositionRef}
                            onClick={() => onClickPoint(pointName)}
                            setDeletingButton={setDeletingButton}
                        />
                    );
                }
            )}
        </S_DesignGrid>
    );
}

const S_DesignGrid = styled.div`
    cursor: pointer;
    width: ${(props) => props.width}px;
    margin: auto;
    position: relative;
    width: ${(props) => props.width}px;
`;

export default Grid;
