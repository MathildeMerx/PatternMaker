import { useState, useEffect } from "react";
import styled from "styled-components";

//This component renders a pattern point in the grid
function PatternPoint({
    pointName,
    cellWidth,
    cellHeight,
    positionX,
    positionY,
    onClick,
    SVGRef,
    setPoints,
    setDeleteButton,
    mousePositionRef,
}) {
    //onMouseDown will set this state to true
    let [isDragging, setIsDragging] = useState(false);

    //we register the position of the mouse onMouseDown. If the position
    //is the same onMouseUp, then the point is deleted.
    let [mousePosition, setMousePosition] = useState([0, 0]);

    //The localisation of the grid on screen is obtained with this
    //(it'll be useful to determine the exact mouse location)
    const draggingInfo = SVGRef.current.getBoundingClientRect();

    //When dragging, the position of the point being dragged is
    //updated every 20ms.
    useEffect(() => {
        const interval = setInterval(() => {
            if (isDragging) {
                //parseFloat required because toFixed returns a string
                setPoints((points) => ({
                    ...points,
                    [pointName]: [
                        parseFloat(
                            (
                                (mousePositionRef.current[0] -
                                    draggingInfo.left) /
                                cellWidth
                            ).toFixed(1)
                        ),
                        parseFloat(
                            (
                                (mousePositionRef.current[1] -
                                    draggingInfo.top) /
                                cellHeight
                            ).toFixed(1)
                        ),
                    ],
                }));
            }
        }, 20);

        return () => clearInterval(interval);
    }, [
        isDragging,
        mousePositionRef,
        cellWidth,
        cellHeight,
        draggingInfo.left,
        draggingInfo.top,
        setPoints,
        pointName,
    ]);

    return (
        <S_PatternPoint
            cellHeight={cellHeight}
            cellWidth={cellWidth}
            onClick={onClick}
            pixelsX={positionX * cellWidth}
            pixelsY={positionY * cellHeight}
            onMouseDown={(event) => {
                setIsDragging(true);
                //parseFloat required because toFixed returns a string
                setMousePosition([
                    parseFloat(
                        (
                            (event.clientX - draggingInfo.left) /
                            cellWidth
                        ).toFixed(1)
                    ),
                    parseFloat(
                        (
                            (event.clientY - draggingInfo.top) /
                            cellHeight
                        ).toFixed(1)
                    ),
                ]);
            }}
            onMouseUp={(event) => {
                setIsDragging(false);
                //parseFloat required because toFixed returns a string
                if (
                    parseFloat(
                        (
                            (event.clientX - draggingInfo.left) /
                            cellWidth
                        ).toFixed(1)
                    ) === mousePosition[0] &&
                    parseFloat(
                        (
                            (event.clientY - draggingInfo.top) /
                            cellHeight
                        ).toFixed(1)
                    ) === mousePosition[1]
                ) {
                    setDeleteButton(true);
                }
            }}
        >
            <S_PointName cellHeight={cellHeight} cellWidth={cellWidth}>
                {pointName}
            </S_PointName>
        </S_PatternPoint>
    );
}

//function called when the user is clicking on a point
function deletePoint(
    pointName,
    setPoints,
    setPossiblePointNames,
    segments,
    curves,
    setAlertMessage,
    deleteButton,
    setDeleteButton
) {
    //The `deleteButton` variable is true when the point is not dragged
    //(i.e. mouseUp done at the same place as mouseDown)

    //checking whether this point belongs to a segment
    if (deleteButton) {
        for (let seg in segments) {
            if (
                segments[seg][0] === pointName ||
                segments[seg][1] === pointName
            ) {
                //if yes, the point is not deleted and an alert message is generated
                setAlertMessage([
                    "deletePointSegment",
                    pointName,
                    segments[seg],
                ]);
                return;
            }
        }

        //checking whether this point belongs to a curve
        for (let curv in curves) {
            if (
                curves[curv][0] === pointName ||
                curves[curv][1] === pointName
            ) {
                //if yes, the point is not deleted and an alert message is generated
                setAlertMessage([
                    "deletePointCurve",
                    pointName,
                    curves[curv].slice(0, 2),
                ]);
                return;
            }
        }

        //else, the point is deleted
        setPoints((points) => {
            const { [pointName]: val, ...rest } = points;
            return rest;
        });

        //the name of the point deleted is returned to available point names
        setPossiblePointNames((possiblePointNames) => {
            return [...possiblePointNames, pointName].sort();
        });
    }
    setDeleteButton(false);
}

const S_PatternPoint = styled.div`
    background-color: ${({ theme }) => theme.colours.bright};
    cursor: pointer;
    font-size: ${(props) =>
        Math.max(0.75, Math.min(props.cellWidth, props.cellHeight) / 60)}rem;
    font-weight: bold;
    height: ${(props) =>
        Math.max(6, Math.max(props.cellHeight, props.cellWidth) / 5)}px;
    left: ${(props) =>
        props.pixelsX -
        Math.max(6, Math.max(props.cellHeight, props.cellWidth) / 5) / 2}px;
    opacity: 1;
    position: absolute;
    border-radius: 50%;
    text-align: center;
    top: ${(props) =>
        props.pixelsY -
        Math.max(6, Math.max(props.cellHeight, props.cellWidth) / 5) / 2}px;
    width: ${(props) =>
        Math.max(6, Math.max(props.cellHeight, props.cellWidth) / 5)}px;

    &:hover {
        background-color: ${({ theme }) => theme.colours.contrast};
    }
`;

const S_PointName = styled.div`
    position: relative;
    top: ${(props) => props.cellHeight / 5}px;
    left: ${(props) => props.cellWidth / 5}px;
`;

export { PatternPoint, deletePoint };
