import { Add } from "@mui/icons-material";
import styled from "styled-components";
import { useState } from "react";
import SegmentSelectPoints from "./SegmentSelectPoints";

//A "+" button to create new segments
function SegmentAddButton({ points, setSegments, setAlertMessage }) {
    //This variable specifies whether the user is inputting a new segment -
    //in that case, the "+" disappears
    const [addingSegment, setAddingSegment] = useState(false);
    return !addingSegment ? (
        <S_Add onClick={() => setAddingSegment(true)} />
    ) : (
        <SegmentSelectPoints
            points={points}
            setSegments={setSegments}
            setAddingSegment={setAddingSegment}
            setAlertMessage={setAlertMessage}
        />
    );
}

const S_Add = styled(Add)`
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

export default SegmentAddButton;
