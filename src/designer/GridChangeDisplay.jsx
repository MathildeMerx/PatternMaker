import {
    ArrowForward,
    ArrowBack,
    ArrowUpward,
    ArrowDownward,
    ZoomIn,
    ZoomOut,
} from "@mui/icons-material";
import styled from "styled-components";
import { NUM_CELLS_MAX, NUM_CELLS_MIN } from "../Theme/constants";

function GridChangeDisplay({
    setNumCells,
    numCells,
    setVerticalGridPosition,
    setHorizontalGridPosition,
}) {
    function onClickMoveRight() {
        setHorizontalGridPosition((horizontalGridPosition) => {
            if (
                horizontalGridPosition + numCells + Math.floor(numCells * 0.1) >
                NUM_CELLS_MAX
            ) {
                return NUM_CELLS_MAX - numCells;
            }
            return horizontalGridPosition + Math.floor(numCells * 0.1);
        });
    }
    function onClickMoveLeft() {
        setHorizontalGridPosition((horizontalGridPosition) => {
            if (horizontalGridPosition - Math.floor(numCells * 0.1) < 0) {
                return 0;
            }
            return horizontalGridPosition - Math.floor(numCells * 0.1);
        });
    }

    function onClickMoveUp() {
        setVerticalGridPosition((verticalGridPosition) => {
            if (verticalGridPosition - Math.floor(numCells * 0.1) < 0) {
                return 0;
            }
            return verticalGridPosition - Math.floor(numCells * 0.1);
        });
    }
    function onClickMoveDown() {
        setVerticalGridPosition((verticalGridPosition) => {
            if (
                verticalGridPosition + numCells + Math.floor(numCells * 0.1) >
                NUM_CELLS_MAX
            ) {
                return NUM_CELLS_MAX - numCells;
            }
            return verticalGridPosition + Math.floor(numCells * 0.1);
        });
    }

    function onClickZoomIn() {
        setNumCells((numCells) => Math.max(NUM_CELLS_MIN, numCells - 10));
        setVerticalGridPosition(
            (verticalGridPosition) =>
                verticalGridPosition + (numCells === NUM_CELLS_MIN ? 0 : 5)
        );
        setHorizontalGridPosition(
            (horizontalGridPosition) =>
                horizontalGridPosition + (numCells === NUM_CELLS_MIN ? 0 : 5)
        );
    }

    function onClickZoomOut() {
        setVerticalGridPosition((verticalGridPosition) => {
            if (
                verticalGridPosition - 5 >= 0 &&
                verticalGridPosition + (numCells + 5) + 5 <= NUM_CELLS_MAX
            ) {
                return verticalGridPosition - 5;
            }
            if (verticalGridPosition - 5 < 0) {
                return 0;
            }
            return NUM_CELLS_MAX - numCells - 10;
        });
        setHorizontalGridPosition((horizontalGridPosition) => {
            if (
                horizontalGridPosition - 5 >= 0 &&
                horizontalGridPosition + (numCells + 5) + 5 <= NUM_CELLS_MAX
            ) {
                return horizontalGridPosition - 5;
            }
            if (horizontalGridPosition - 5 < 0) {
                return 0;
            }
            return NUM_CELLS_MAX - numCells - 10;
        });
        setNumCells((numCells) => Math.min(NUM_CELLS_MAX, numCells + 10));
    }
    return (
        <S_GridChangeDisplay>
            <S_ArrowUpward onClick={onClickMoveUp} />
            <S_ArrowBack onClick={onClickMoveLeft} />
            <S_ZoomButtons>
                <S_ZoomIn onClick={onClickZoomIn} />

                <S_ZoomOut onClick={onClickZoomOut} />
            </S_ZoomButtons>
            <S_ArrowForward onClick={onClickMoveRight} />
            <S_ArrowDownward onClick={onClickMoveDown} />
        </S_GridChangeDisplay>
    );
}

const S_ArrowDownward = styled(ArrowDownward)`
    cursor: pointer;
    grid-column: 2;
    grid-row: 3;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_ArrowUpward = styled(ArrowUpward)`
    cursor: pointer;
    grid-column: 2;
    grid-row: 1;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_ArrowBack = styled(ArrowBack)`
    cursor: pointer;
    grid-column: 1;
    grid-row: 2;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_ArrowForward = styled(ArrowForward)`
    cursor: pointer;
    grid-column: 3;
    grid-row: 2;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_GridChangeDisplay = styled.div`
    align-items: center;
    display: grid;
    gap: 8px;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 2fr 1fr;
    justify-items: center;
    margin-left: auto;
`;

const S_ZoomButtons = styled.div`
    display: grid;
    grid-column: 2;
    grid-row: 2;
`;

const S_ZoomIn = styled(ZoomIn)`
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_ZoomOut = styled(ZoomOut)`
    background-color: ${({ theme }) => theme.colours.background};
    cursor: pointer;
    z-index: 1;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

export default GridChangeDisplay;
