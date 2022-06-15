import { useState, useCallback, Fragment } from "react";
import { useTheme } from "styled-components";
import useMousePositionGrid from "../useMousePositionGrid";

// This component renders a pattern point in the SVG grid
function PatternPoint({
    pointName,
    cellSize,
    positionX,
    positionY,
    SVGRef,
    setPoints,
    mousePositionRef,
    onClick,
    setDeletingButton,
    verticalGridPosition,
    horizontalGridPosition,
}) {
    //This theme will be used for the colors of the SVG points
    const theme = useTheme();

    const mousePositionToCoordinate = useCallback(
        (mousePosition, horizontalBoolean) => {
            // The localisation of the grid on screen is obtained with this
            // (so as to determine the exact mouse location)
            const draggingInfo = SVGRef.current.getBoundingClientRect();
            return (
                parseFloat(
                    (
                        (mousePosition -
                            (horizontalBoolean
                                ? draggingInfo.left
                                : draggingInfo.top)) /
                        cellSize
                    ).toFixed(1)
                ) +
                (horizontalBoolean
                    ? horizontalGridPosition
                    : verticalGridPosition)
            );
        },
        [SVGRef, cellSize]
    );

    // onMouseDown will set this state to true
    let [isDragging, setIsDragging] = useState(false);

    // We register the position of the mouse onMouseDown. If the position
    // is the same onMouseUp, then the point is deleted.
    let [mousePosition, setMousePosition] = useState([0, 0]);

    const onDragUpdatePoint = useCallback(() => {
        setPoints((points) => ({
            ...points,
            [pointName]: [
                mousePositionToCoordinate(mousePositionRef.current[0], true),
                mousePositionToCoordinate(mousePositionRef.current[1], false),
            ],
        }));
    }, [setPoints, pointName, mousePositionToCoordinate, mousePositionRef]);

    useMousePositionGrid(isDragging, onDragUpdatePoint);

    const [mouseEnter, setMouseEnter] = useState(false);

    return (
        <Fragment key={`point${pointName}`}>
            <circle
                onClick={onClick}
                cx={(positionX * cellSize).toString()}
                cy={(positionY * cellSize).toString()}
                r={cellSize / 10}
                fill={
                    mouseEnter ? theme.colours.contrast : theme.colours.bright
                }
                onMouseDown={(event) => {
                    setIsDragging(true);
                    setMousePosition([
                        mousePositionToCoordinate(event.clientX, true),
                        mousePositionToCoordinate(event.clientY, false),
                    ]);
                }}
                onMouseUp={(event) => {
                    setIsDragging(false);
                    if (
                        mousePositionToCoordinate(event.clientX, true) ===
                            mousePosition[0] &&
                        mousePositionToCoordinate(event.clientY, false) ===
                            mousePosition[1]
                    ) {
                        setDeletingButton(true);
                    }
                }}
                onMouseLeave={() => setMouseEnter(false)}
                onMouseEnter={() => setMouseEnter(true)}
            ></circle>
            {cellSize > 10 ? (
                <text
                    x={(positionX * cellSize + cellSize / 10).toString()}
                    y={(positionY * cellSize + cellSize / 10).toString()}
                    fill={
                        mouseEnter
                            ? theme.colours.contrast
                            : theme.colours.bright
                    }
                >
                    {pointName}
                </text>
            ) : null}
        </Fragment>
    );
}

export default PatternPoint;
