import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import useMousePositionGrid from "../useMousePositionGrid";

// This component renders a pattern point in the SVG grid
function PatternPoint({
    pointName,
    cellWidth,
    cellHeight,
    positionX,
    positionY,
    SVGRef,
    setPoints,
    mousePositionRef,
    onClick,
    setDeletingButton,
}) {
    function mousePositionToCoordinate(mousePosition, horizontalBoolean) {
        // The localisation of the grid on screen is obtained with this
        // (so as to determine the exact mouse location)
        const draggingInfo = SVGRef.current.getBoundingClientRect();
        return parseFloat(
            (
                (mousePosition -
                    (horizontalBoolean
                        ? draggingInfo.left
                        : draggingInfo.top)) /
                (horizontalBoolean ? cellWidth : cellHeight)
            ).toFixed(1)
        );
    }

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

    return (
        <S_PatternPoint
            cellHeight={cellHeight}
            cellWidth={cellWidth}
            onClick={onClick}
            pixelsX={positionX * cellWidth}
            pixelsY={positionY * cellHeight}
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
        >
            <S_PointName cellHeight={cellHeight} cellWidth={cellWidth}>
                {pointName}
            </S_PointName>
        </S_PatternPoint>
    );
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

export default PatternPoint;
