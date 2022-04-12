import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { CurveSelectPoints } from "./CurveSelectPoints";

function CurveAddButton({
    setCurves,
    points,
    cellWidth,
    cellHeight,
    setAlertMessage,
}) {
    const [addingCurve, setAddingCurve] = useState(false);

    if (!addingCurve) {
        return (
            <button onClick={() => setAddingCurve(true)}>
                <AddIcon />
            </button>
        );
    } else {
        return (
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
}

export { CurveAddButton };
