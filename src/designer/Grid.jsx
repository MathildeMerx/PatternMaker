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
import samePlacePoint from "./samePlacePoint";

//This grid will: 1) show on-screen the pattern the user is drafting;
//2) enable the user to modify parts of it (curves and points)
function Grid({
    numCells,
    points,
    setPoints,
    cellSize,
    possiblePointNames,
    setPossiblePointNames,
    segments,
    curves,
    setCurves,
    setAlertMessage,
    verticalGridPosition,
    horizontalGridPosition,
}) {
    //Ref for the drag'n'drop (specifies where the grid is positioned on screen)
    const SVGRef = useRef();

    //Arrays which will be used for the grid lines
    const arrCellsPerLine = [...Array(numCells + 1).keys()];

    //Width and height of the grid
    const gridSize = numCells * cellSize;

    //The position of the mouse is used for drag'n'drops
    const mousePositionRef = useRef([0, 0]);

    function mousePositionToCoordinate(
        mousePosition,
        parentPosition,
        cellDimension,
        xCoordinate
    ) {
        return (
            parseFloat(
                ((mousePosition - parentPosition) / cellDimension).toFixed(1)
            ) + (xCoordinate ? horizontalGridPosition : verticalGridPosition)
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

    // Will be used onClick in the grid (if the user wants to create a new point,
    // it's created at the right location with the right name)
    function createNewPoint(event) {
        let pointName = possiblePointNames[0];
        setPoints((points) => ({
            ...points,
            [pointName]: [
                mousePositionToCoordinate(
                    event.clientX,
                    SVGRef.current.parentElement.getBoundingClientRect().left,
                    cellSize,
                    true
                ),
                mousePositionToCoordinate(
                    event.clientY,
                    SVGRef.current.parentElement.getBoundingClientRect().top,
                    cellSize,
                    false
                ),
            ],
        }));
        setPossiblePointNames((possiblePointNames) =>
            possiblePointNames.slice(1)
        );
    }
    // When the user clicks in the grid, if that's not on a point (which would be
    // to delete it) or to drag a point (onMouseUp it's exactly over a point)
    // a point is created
    function onClickGrid(event) {
        if (
            !deletingButton &&
            !samePlacePoint(
                [
                    mousePositionToCoordinate(
                        event.clientX,
                        SVGRef.current.parentElement.getBoundingClientRect()
                            .left,
                        cellSize,
                        true
                    ),
                    mousePositionToCoordinate(
                        event.clientY,
                        SVGRef.current.parentElement.getBoundingClientRect()
                            .top,
                        cellSize,
                        false
                    ),
                ],
                points
            )
        ) {
            createNewPoint(event);
        }
    }

    return (
        <S_DesignGrid gridSize={gridSize}>
            {/* These are the vertical lines of the grid. Each line in 5 has a legend */}
            {arrCellsPerLine.map((line) => (
                <Column
                    key={`col${line}`}
                    line={line}
                    cellSize={cellSize}
                    horizontalGridPosition={horizontalGridPosition}
                />
            ))}

            {/* These are the horizontal lines of the grid. Each line in 5 has a legend */}
            {arrCellsPerLine.map((line) => (
                <Row
                    key={`row${line}`}
                    line={line}
                    cellSize={cellSize}
                    gridSize={gridSize}
                    verticalGridPosition={verticalGridPosition}
                />
            ))}

            {/*SVG of all the geometrical shapes of the pattern */}
            {/*When clicking in the SVG, it creates a new point */}
            {/*The mouse position in the grid is always recorded for drag'n'drops */}
            <svg
                ref={SVGRef}
                width={gridSize}
                height={gridSize}
                viewBox={`${horizontalGridPosition * cellSize} ${
                    verticalGridPosition * cellSize
                } ${gridSize} ${gridSize} `}
                onMouseMove={(event) =>
                    (mousePositionRef.current = [event.clientX, event.clientY])
                }
                onClick={(event) => onClickGrid(event)}
            >
                {/* If there are no points tell the user they can
                click on the grid to create points */}
                {Object.keys(points).length === 0 ? (
                    <NoPointText gridSize={gridSize} />
                ) : null}

                {/* Here all the segments are rendered in the grid */}
                {segments.map((seg) => (
                    <SegmentPath
                        key={seg[0] + seg[1]}
                        segment={seg}
                        points={points}
                        cellSize={cellSize}
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
                            cellSize={cellSize}
                            mousePositionRef={mousePositionRef}
                            verticalGridPosition={verticalGridPosition}
                            horizontalGridPosition={horizontalGridPosition}
                            key={index}
                        />
                    );
                })}

                {Object.entries(points).map(
                    ([pointName, [positionX, positionY]]) => {
                        return (
                            <PatternPoint
                                pointName={pointName}
                                cellSize={cellSize}
                                positionX={positionX}
                                positionY={positionY}
                                SVGRef={SVGRef}
                                key={pointName}
                                setPoints={setPoints}
                                mousePositionRef={mousePositionRef}
                                onClick={() => onClickPoint(pointName)}
                                setDeletingButton={setDeletingButton}
                                verticalGridPosition={verticalGridPosition}
                                horizontalGridPosition={horizontalGridPosition}
                            />
                        );
                    }
                )}
            </svg>
        </S_DesignGrid>
    );
}

const S_DesignGrid = styled.div`
    cursor: pointer;
    height: ${(props) => props.gridSize}px;
    margin: auto;
    position: relative;
    width: ${(props) => props.gridSize}px;
`;

export default Grid;
