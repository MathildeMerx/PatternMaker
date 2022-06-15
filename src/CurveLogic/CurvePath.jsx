import { useCallback, useEffect, useState } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";
import useMousePositionGrid from "../useMousePositionGrid";

//Implementation of the curve in the SVG (grid)
function CurvePath({
    curve,
    curveIndex,
    points,
    SVGRef,
    setCurves,
    cellSize,
    mousePositionRef,
}) {
    const theme = useTheme();

    //State determining whether the control point and construction segments
    //are visible
    const [showConstructionSegments, setShowConstructionSegments] =
        useState(false);

    //When hovering above a segment, it will become bolder to show the user
    //they can interact with it
    const [isHovering, setIsHovering] = useState(false);

    //The control point can be moved by dragging it
    const [isDragging, setIsDragging] = useState(false);

    //These 3 points determining the shape of the curve
    const { startPoint, endPoint, controlPoint } = curve;

    //The abscissa and ordinate of the 3 points above
    const startAbscissa = points[startPoint][0] * cellSize;
    const startOrdinate = points[startPoint][1] * cellSize;
    const endAbscissa = points[endPoint][0] * cellSize;
    const endOrdinate = points[endPoint][1] * cellSize;
    const [controlAbscissa, setControlAbscissa] = useState(controlPoint[0]);
    const [controlOrdinate, setControlOrdinate] = useState(controlPoint[1]);

    const onDragControlPoint = useCallback(() => {
        //It'll give the postion of of grid on screen, to determine
        //the exact position of the mouse
        const draggingInfo = SVGRef.current.getBoundingClientRect();
        setControlAbscissa(
            (mousePositionRef.current[0] - draggingInfo.left) / cellSize
        );
        setControlOrdinate(
            (mousePositionRef.current[1] - draggingInfo.top) / cellSize
        );
    }, [
        SVGRef,
        setControlAbscissa,
        setControlOrdinate,
        mousePositionRef,
        cellSize,
    ]);

    //Every 20ms, the position of the mouse in the grid is updated.
    useMousePositionGrid(isDragging, onDragControlPoint);

    //When the abscissa and ordinate of the control point change,
    //the state representing the curves is updated
    useEffect(() => {
        setCurves((curves) => {
            let curvesCopy = JSON.parse(JSON.stringify(curves));
            curvesCopy[curveIndex].controlPoint = [
                controlAbscissa,
                controlOrdinate,
            ];
            return curvesCopy;
        });
    }, [controlAbscissa, controlOrdinate, curveIndex, setCurves]);

    return (
        <>
            {/*Path representing the curve */}
            <S_PathPointer
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={(event) => {
                    event.stopPropagation();
                    setShowConstructionSegments((value) => !value);
                }}
                d={`M ${startAbscissa} ${startOrdinate} 
                    Q ${controlAbscissa * cellSize} 
                      ${controlOrdinate * cellSize} 
                      ${endAbscissa} ${endOrdinate}`}
                fill="none"
                stroke={theme.colours.bright}
                strokeWidth={isHovering ? "6" : "3"}
            />

            {/*The next 3 elements represent the construction parts: control points and 
            segments linking it to the extremities of the curve */}
            {showConstructionSegments ? (
                <path
                    d={`M ${startAbscissa} ${startOrdinate} 
                        L ${controlAbscissa * cellSize} 
                          ${controlOrdinate * cellSize} `}
                    fill="none"
                    stroke={theme.colours.contrast}
                    strokeDasharray="4"
                    strokeWidth="3"
                />
            ) : null}

            {showConstructionSegments ? (
                <path
                    d={`M ${endAbscissa} ${endOrdinate} 
                        L ${controlAbscissa * cellSize} 
                          ${controlOrdinate * cellSize} `}
                    fill="none"
                    stroke={theme.colours.contrast}
                    strokeDasharray="4"
                    strokeWidth="3"
                />
            ) : null}

            {showConstructionSegments ? (
                <circle
                    onClick={(event) => event.stopPropagation()}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={(event) => {
                        setIsDragging(false);
                    }}
                    cx={controlAbscissa * cellSize}
                    cy={controlOrdinate * cellSize}
                    r="5"
                    fill={theme.colours.contrast}
                />
            ) : null}
        </>
    );
}

const S_PathPointer = styled.path`
    cursor: pointer;
`;

export default CurvePath;
