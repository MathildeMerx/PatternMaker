import { useEffect, useState } from "react";

function CurvePath({
    curve,
    curveIndex,
    existingPoints,
    SVGRef,
    setCurves,
    cellHeight,
    cellWidth,
}) {
    const [showConstructionSegments, setShowConstructionSegments] =
        useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startPoint, endPoint, ...controlPoint] = curve;

    const startAbscissa = existingPoints[startPoint][0] * cellWidth;
    const startOrdinate = existingPoints[startPoint][1] * cellHeight;
    const endAbscissa = existingPoints[endPoint][0] * cellWidth;
    const endOrdinate = existingPoints[endPoint][1] * cellHeight;
    const [controlAbscissa, setControlAbscissa] = useState(
        () => controlPoint[0]
    );
    const [controlOrdinate, setControlOrdinate] = useState(
        () => controlPoint[1]
    );

    const draggingInfo = SVGRef.current.getBoundingClientRect();

    function handleMouseMove({ clientX, clientY }) {
        if (isDragging) {
            setControlAbscissa((clientX - draggingInfo.left) / cellWidth);
            setControlOrdinate((clientY - draggingInfo.top) / cellHeight);
        } else {
            return;
        }
    }

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
