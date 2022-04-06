import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { CurveSelectPoints } from "./CurveSelectPoints";

function CurveAddButton({
    setCurves,
    existingPoints,
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
                existingPoints={existingPoints}
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
