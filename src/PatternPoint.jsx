import styled, { css } from "styled-components";
import { pointExists } from "./pointExists";

function PatternPoint({ index, value, numCellHeight, gridSpacing, onClick }) {
    const distFromTop = (index % (numCellHeight - 1)) * gridSpacing + 42;
    const distFromLeft =
        Math.floor(index / (numCellHeight - 1)) * gridSpacing + 42;
    return (
        <S_PatternPoint
            key={index}
            existing={!!value}
            onClick={onClick}
            style={{
                top: `${distFromTop}px`,
                left: `${distFromLeft}px`,
            }}
        >
            {value}
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

const S_PatternPoint = styled.button`
    cursor: pointer;
    height: 16px;
    opacity: 0;
    position: absolute;
    width: 16px;

    &:hover {
        background-color: white;
        border-color: black;
        opacity: 1;
    }

    ${({ existing }) =>
        existing &&
        css`
            background-color: white;
            border: none;
            opacity: 1;
        `}
`;

export { PatternPoint, createNewPoint };
