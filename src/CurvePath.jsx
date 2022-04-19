import { useEffect, useState } from "react";

//Implementation of the curve in the SVG
function CurvePath({
    curve,
    curveIndex,
    points,
    SVGRef,
    setCurves,
    cellHeight,
    cellWidth,
}) {
    //State determining whether the control point and construction segments
    //are visible
    const [showConstructionSegments, setShowConstructionSegments] =
        useState(false);

    //When hovering above a segment, it will become bolder to show the user
    //they can interact with it
    const [isHovering, setIsHovering] = useState(false);

    //The control point can be moved by dragging it
    const [isDragging, setIsDragging] = useState(false);

    //The 3 points determining the shape of the curve
    const [startPoint, endPoint, ...controlPoint] = curve;

    //The abscissa and ordinate of the 3 points above
    const startAbscissa = points[startPoint][0] * cellWidth;
    const startOrdinate = points[startPoint][1] * cellHeight;
    const endAbscissa = points[endPoint][0] * cellWidth;
    const endOrdinate = points[endPoint][1] * cellHeight;
    const [controlAbscissa, setControlAbscissa] = useState(
        () => controlPoint[0]
    );
    const [controlOrdinate, setControlOrdinate] = useState(
        () => controlPoint[1]
    );

    //The localisation of the mouse during drag'n'drop is obtained with this
    const draggingInfo = SVGRef.current.getBoundingClientRect();

    //onDrag doesn't exist in SVGs, so I had to implement it myself: onMouseMove will
    //be used only between onMouseDown and onMouseUp
    function handleMouseMove({ clientX, clientY }) {
        if (isDragging) {
            setControlAbscissa((clientX - draggingInfo.left) / cellWidth);
            setControlOrdinate((clientY - draggingInfo.top) / cellHeight);
        } else {
            return;
        }
    }

    //When the abscissa and ordinate of the control point change, the cusrve state is updated
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
            <path
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={(event) => {
                    event.stopPropagation();
                    setShowConstructionSegments((value) => !value);
                }}
                d={`M ${startAbscissa} ${startOrdinate} 
  Q ${controlAbscissa * cellWidth} ${
                    controlOrdinate * cellHeight
                } ${endAbscissa} ${endOrdinate}`}
                fill="none"
                stroke="red"
                strokeWidth={isHovering ? "5" : "2"}
                style={{ cursor: "pointer" }}
            />
            {showConstructionSegments ? (
                <path
                    d={`M ${startAbscissa} ${startOrdinate} 
L ${controlAbscissa * cellWidth} ${controlOrdinate * cellHeight} `}
                    fill="none"
                    stroke="blue"
                    strokeDasharray="4"
                    strokeWidth="2"
                />
            ) : null}
            {showConstructionSegments ? (
                <path
                    d={`M ${endAbscissa} ${endOrdinate} 
L ${controlAbscissa * cellWidth} ${controlOrdinate * cellHeight} `}
                    fill="none"
                    stroke="blue"
                    strokeDasharray="4"
                    strokeWidth="2"
                />
            ) : null}
            {showConstructionSegments ? (
                <circle
                    onClick={(event) => event.stopPropagation()}
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={(event) => {
                        setIsDragging(false);
                    }}
                    onMouseMove={(event) => handleMouseMove(event)}
                    cx={controlAbscissa * cellWidth}
                    cy={controlOrdinate * cellHeight}
                    r="5"
                    fill="blue"
                />
            ) : null}
        </>
    );
}

export { CurvePath };
