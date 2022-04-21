import { Add } from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import { SegmentSelectPoints } from "./SegmentSelectPoints";

function SegmentAddButton({ points, setSegments, setAlertMessage }) {
    const [addingSegment, setAddingSegment] = useState(false);

    if (!addingSegment) {
        return <S_Add onClick={() => setAddingSegment(true)} />;
    } else {
        return (
            <SegmentSelectPoints
                points={points}
                setSegments={setSegments}
                setAddingSegment={setAddingSegment}
                setAlertMessage={setAlertMessage}
            />
        );
    }
}

export { SegmentAddButton };

const S_Add = styled(Add)`
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;
