import styled, { css } from "styled-components";
import { pointExists } from "./pointExists";

function PatternPoint({
    index,
    value,
    numRows,
    cellHeight,
    cellWidth,
    onClick,
}) {
    const distFromTop =
        ((index % (numRows - 1)) + 1) * cellHeight -
        Math.max(5, Math.max(cellWidth, cellHeight) / 6);
    const distFromLeft =
        Math.floor(index / (numRows - 1) + 1) * cellWidth -
        Math.max(5, Math.max(cellWidth, cellHeight) / 6);
    return (
        <S_PatternPoint
            key={index}
            cellHeight={cellHeight}
            cellWidth={cellWidth}
            existing={!!value}
            onClick={onClick}
            distFromTop={distFromTop}
            distFromLeft={distFromLeft}
        >
            {value ? (
                <S_PointName cellHeight={cellHeight} cellWidth={cellWidth}>
                    {value}
                </S_PointName>
            ) : null}
        </S_PatternPoint>
    );
}

function createNewPoint(
    abscissa,
    ordinate,
    existingPoints,
    setExistingPoints,
    possiblePointNames,
    setPossiblePointNames,
    segments,
    curves,
    setAlertDeletePoint
) {
    let value = pointExists(abscissa, ordinate, existingPoints);

    for (let seg in segments) {
        if (segments[seg][0] === value || segments[seg][1] === value) {
            setAlertDeletePoint(["seg", value, segments[seg]]);
            return;
        }
    }

    for (let curv in curves) {
        if (curves[curv][0] === value || curves[curv][1] === value) {
            setAlertDeletePoint(["curv", value, curves[curv].slice(0, 2)]);
            return;
        }
    }

    setExistingPoints((existingPoints) => {
        if (value) {
            const { [value]: val, ...rest } = existingPoints;
            return rest;
        } else {
            return {
                ...existingPoints,
                [possiblePointNames[0]]: [abscissa, ordinate],
            };
        }
    });

    setPossiblePointNames((possiblePointNames) => {
        if (value) {
            return [...possiblePointNames, value].sort();
        } else {
            return possiblePointNames.slice(1);
        }
    });
}

const S_PatternPoint = styled.div`
    cursor: pointer;
    font-size: ${(props) =>
        Math.max(0.75, Math.min(props.cellWidth, props.cellHeight) / 60)}rem;
    font-weight: bold;
    height: ${(props) =>
        Math.max(10, Math.max(props.cellHeight, props.cellWidth) / 3)}px;
    left: ${(props) => props.distFromLeft}px;
    opacity: 0;
    position: absolute;
    border-radius: 50%;
    text-align: center;
    top: ${(props) => props.distFromTop}px;
    width: ${(props) =>
        Math.max(10, Math.max(props.cellHeight, props.cellWidth) / 3)}px;

    &:hover {
        background-color: gainsboro;
        opacity: 1;
    }

    ${(props) =>
        props.existing &&
        css`
            background-color: red;
            height: ${(props) =>
                Math.max(6, Math.max(props.cellHeight, props.cellWidth) / 5)}px;
            left: ${(props) =>
                props.distFromLeft + Math.max(3, props.cellWidth / 10)}px;
            opacity: 1;
            top: ${(props) =>
                props.distFromTop + Math.max(3, props.cellHeight / 10)}px;
            width: ${(props) =>
                Math.max(6, Math.max(props.cellHeight, props.cellWidth) / 5)}px;
        `}
`;

const S_PointName = styled.div`
    position: relative;
    top: ${(props) => props.cellHeight / 5}px;
    left: ${(props) => props.cellWidth / 5}px;
`;

export { PatternPoint, createNewPoint };
