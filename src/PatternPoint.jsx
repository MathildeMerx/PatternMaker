import styled, { css } from "styled-components";
import { pointExists } from "./pointExists";

function PatternPoint({ index, value, numCellHeight, gridSpacing, onClick }) {
    const distFromTop =
        ((index % (numCellHeight - 1)) + 1) * gridSpacing -
        Math.max(5, gridSpacing / 6);
    const distFromLeft =
        Math.floor(index / (numCellHeight - 1) + 1) * gridSpacing -
        Math.max(5, gridSpacing / 6);
    return (
        <S_PatternPoint
            key={index}
            gridSpacing={gridSpacing}
            existing={!!value}
            onClick={onClick}
            distFromTop={distFromTop}
            distFromLeft={distFromLeft}
        >
            {value ? (
                <S_PointName gridSpacing={gridSpacing}>{value}</S_PointName>
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
    segments
) {
    let value = pointExists(abscissa, ordinate, existingPoints);

    for (let seg in segments) {
        if (segments[seg][0] === value || segments[seg][1] === value) {
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
    font-size: ${(props) => Math.max(0.75, props.gridSpacing / 60)}rem;
    font-weight: bold;
    height: ${(props) => Math.max(10, props.gridSpacing / 3)}px;
    left: ${(props) => props.distFromLeft}px;
    opacity: 0;
    position: absolute;
    border-radius: 50%;
    text-align: center;
    top: ${(props) => props.distFromTop}px;
    width: ${(props) => Math.max(10, props.gridSpacing / 3)}px;

    &:hover {
        background-color: gainsboro;
        opacity: 1;
    }

    ${(props) =>
        props.existing &&
        css`
            background-color: red;
            height: ${(props) => Math.max(6, props.gridSpacing / 5)}px;
            left: ${(props) =>
                props.distFromLeft + Math.max(3, props.gridSpacing / 10)}px;
            opacity: 1;
            top: ${(props) =>
                props.distFromTop + Math.max(3, props.gridSpacing / 10)}px;
            width: ${(props) => Math.max(6, props.gridSpacing / 5)}px;
        `}
`;

const S_PointName = styled.div`
    position: relative;
    top: ${(props) => props.gridSpacing / 5}px;
    left: ${(props) => props.gridSpacing / 5}px;
`;

export { PatternPoint, createNewPoint };
