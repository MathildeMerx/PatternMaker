import { Add } from "@mui/icons-material";
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
        return <Add onClick={() => setAddingCurve(true)} />;
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
