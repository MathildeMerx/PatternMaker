import { useEffect, useState } from "react";
import { areArraysEqual } from "./areArraysEqual";

function CurvePath({ curve, curveIndex, existingPoints, SVGRef, setCurves }) {
    const [showConstructionSegments, setShowConstructionSegments] =
        useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [startPoint, endPoint, ...controlPoint] = curve;

    const startAbscissa = existingPoints[startPoint][0] * 50;
    const startOrdinate = existingPoints[startPoint][1] * 50;
    const endAbscissa = existingPoints[endPoint][0] * 50;
    const endOrdinate = existingPoints[endPoint][1] * 50;
    const [controlAbscissa, setControlAbscissa] = useState(
        () => controlPoint[0] * 50
    );
    const [controlOrdinate, setControlOrdinate] = useState(
        () => controlPoint[1] * 50
    );

    const draggingInfo = SVGRef.current.getBoundingClientRect();

    function handleMouseMove({ clientX, clientY }) {
        if (isDragging) {
            setControlAbscissa(clientX - draggingInfo.left);
            setControlOrdinate(clientY - draggingInfo.top);
        } else {
            return;
        }
    }

    useEffect(() => {
        setCurves((curves) => {
            const currentCurve = curves[curveIndex];
            let curvesCopy = curves.slice();
            for (let i = 0; i < curvesCopy.length; i++) {
                if (areArraysEqual(curves[i], currentCurve)) {
                    curvesCopy[i] = [
                        currentCurve[0],
                        currentCurve[1],
                        controlAbscissa / 50,
                        controlOrdinate / 50,
                    ];
                }
            }
            return curvesCopy;
        });
    }, [controlAbscissa, controlOrdinate, curveIndex, setCurves]);

    return (
        <>
            <path
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onClick={() => setShowConstructionSegments((value) => !value)}
                d={`M ${startAbscissa} ${startOrdinate} 
  Q ${controlAbscissa} ${controlOrdinate} ${endAbscissa} ${endOrdinate}`}
                fill="none"
                stroke="red"
                strokeWidth={isHovering ? "5" : "2"}
                style={{ cursor: "pointer" }}
            />
            {showConstructionSegments ? (
                <path
                    d={`M ${startAbscissa} ${startOrdinate} 
L ${controlAbscissa} ${controlOrdinate} `}
                    fill="none"
                    stroke="blue"
                    strokeDasharray="4"
                    strokeWidth="2"
                />
            ) : null}
            {showConstructionSegments ? (
                <path
                    d={`M ${endAbscissa} ${endOrdinate} 
L ${controlAbscissa} ${controlOrdinate} `}
                    fill="none"
                    stroke="blue"
                    strokeDasharray="4"
                    strokeWidth="2"
                />
            ) : null}
            {showConstructionSegments ? (
                <circle
                    onMouseDown={() => setIsDragging(true)}
                    onMouseUp={() => setIsDragging(false)}
                    onMouseMove={(event) => handleMouseMove(event)}
                    cx={controlAbscissa}
                    cy={controlOrdinate}
                    r="5"
                    fill="blue"
                    style={{ zIndex: "1" }}
                />
            ) : null}
        </>
    );
}

export { CurvePath };
