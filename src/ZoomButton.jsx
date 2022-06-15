import {
    ArrowForward,
    ArrowBack,
    ArrowUpward,
    ArrowDownward,
    ZoomIn,
    ZoomOut,
} from "@mui/icons-material";
import styled from "styled-components";
import { NUM_CELLS_MAX, NUM_CELLS_MIN } from "./Theme/constants";

function ZoomButton({ setNumCells }) {
    return (
        <div>
            <S_ZoomOut
                onClick={() =>
                    setNumCells((numCells) =>
                        Math.min(NUM_CELLS_MAX, numCells + 5)
                    )
                }
            />
            <S_ZoomIn
                onClick={() =>
                    setNumCells((numCells) =>
                        Math.max(NUM_CELLS_MIN, numCells - 5)
                    )
                }
            />
        </div>
    );
}

const S_ZoomIn = styled(ZoomIn)`
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_ZoomOut = styled(ZoomOut)`
    cursor: pointer;
    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

export default ZoomButton;
