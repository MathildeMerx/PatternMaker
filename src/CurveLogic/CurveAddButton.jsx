import { Add } from "@mui/icons-material";
import { useState } from "react";
import CurveSelectPoints from "./CurveSelectPoints";
import styled from "styled-components";

//A "+" button to create new curves
function CurveAddButton({
    setCurves,
    points,
    cellWidth,
    cellHeight,
    setAlertMessage,
}) {
    //This variable specifies whether the user is inputting a new curve -
    //in that case, the "+" disappears
    const [addingCurve, setAddingCurve] = useState(false);
    return !addingCurve ? (
        <S_Add onClick={() => setAddingCurve(true)} />
    ) : (
        <CurveSelectPoints
            points={points}
            setCurves={setCurves}
            setAddingCurve={setAddingCurve}
            cellHeight={cellHeight}
            cellWidth={cellWidth}
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

export default CurveAddButton;
