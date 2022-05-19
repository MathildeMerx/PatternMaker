import { useEffect, useState } from "react";
import { useTheme } from "styled-components";
import styled from "styled-components";

//Implementation of the curve in the SVG (grid)
function CurvePath({
    curve,
    curveIndex,
    points,
    SVGRef,
    setCurves,
    cellHeight,
    cellWidth,
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
    const [startPoint, endPoint, ...controlPoint] = curve;

    //The abscissa and ordinate of the 3 points above
    const startAbscissa = points[startPoint][0] * cellWidth;
    const startOrdinate = points[startPoint][1] * cellHeight;
    const endAbscissa = points[endPoint][0] * cellWidth;
    const endOrdinate = points[endPoint][1] * cellHeight;
    const [controlAbscissa, setControlAbscissa] = useState(controlPoint[0]);
    const [controlOrdinate, setControlOrdinate] = useState(controlPoint[1]);

    //Every 20ms, the position of the mouse in the grid is updated.
    useEffect(() => {
        const interval = setInterval(() => {
            //It'll give the postion of of grid on screen, to determine
            //the exact position of the mouse
            const draggingInfo = SVGRef.current.getBoundingClientRect();

            //If the user is dragging a control point,
            //the state is updated with its new position
            if (isDragging) {
                setControlAbscissa(
                    (mousePositionRef.current[0] - draggingInfo.left) /
                        cellWidth
                );
                setControlOrdinate(
                    (mousePositionRef.current[1] - draggingInfo.top) /
                        cellHeight
                );
            }
        }, 20);

        return () => clearInterval(interval);
    }, [isDragging, mousePositionRef, cellWidth, cellHeight, SVGRef]);

    //When the abscissa and ordinate of the control point change,
    //the state representing the curves is updated
    useEffect(() => {
        setCurves((curves) => {
            const currentCurve = curves[curveIndex];
            let curvesCopy = JSON.parse(JSON.stringify(curves));
            curvesCopy[curveIndex] = [
                currentCurve[0],
                currentCurve[1],
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
                    Q ${controlAbscissa * cellWidth} 
                      ${controlOrdinate * cellHeight} 
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
                        L ${controlAbscissa * cellWidth} 
                          ${controlOrdinate * cellHeight} `}
                    fill="none"
                    stroke={theme.colours.contrast}
                    strokeDasharray="4"
                    strokeWidth="3"
                />
            ) : null}

            {showConstructionSegments ? (
                <path
                    d={`M ${endAbscissa} ${endOrdinate} 
                        L ${controlAbscissa * cellWidth} 
                          ${controlOrdinate * cellHeight} `}
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
                    cx={controlAbscissa * cellWidth}
                    cy={controlOrdinate * cellHeight}
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
