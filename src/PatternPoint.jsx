import styled from "styled-components";
import { pointExists } from "./pointExists";

function PatternPoint({
    pointName,
    cellWidth,
    cellHeight,
    positionX,
    positionY,
    onClick,
}) {
    return (
        <S_PatternPoint
            cellHeight={cellHeight}
            cellWidth={cellWidth}
            onClick={onClick}
            pixelsX={positionX * cellWidth}
            pixelsY={positionY * cellHeight}
        >
            <S_PointName cellHeight={cellHeight} cellWidth={cellWidth}>
                {pointName}
            </S_PointName>
        </S_PatternPoint>
    );
}

function createNewPoint(
    pointName,
    existingPoints,
    setExistingPoints,
    setPossiblePointNames,
    segments,
    curves,
    setAlertDeletePoint
) {
    for (let seg in segments) {
        if (segments[seg][0] === pointName || segments[seg][1] === pointName) {
            setAlertDeletePoint(["seg", pointName, segments[seg]]);
            return;
        }
    }

    for (let curv in curves) {
        if (curves[curv][0] === pointName || curves[curv][1] === pointName) {
            setAlertDeletePoint(["curv", pointName, curves[curv].slice(0, 2)]);
            return;
        }
    }

    setExistingPoints((existingPoints) => {
        const { [pointName]: val, ...rest } = existingPoints;
        return rest;
    });

    setPossiblePointNames((possiblePointNames) => {
        return [...possiblePointNames, pointName].sort();
    });
}

const S_PatternPoint = styled.div`
    background-color: red;
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
        background-color: gainsboro;
    }
`;

const S_PointName = styled.div`
    position: relative;
    top: ${(props) => props.cellHeight / 5}px;
    left: ${(props) => props.cellWidth / 5}px;
`;

export { PatternPoint, createNewPoint };
