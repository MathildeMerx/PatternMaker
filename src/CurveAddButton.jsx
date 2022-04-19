import { Add } from "@mui/icons-material";
import { useState } from "react";
import { CurveSelectPoints } from "./CurveSelectPoints";

//A "+" button to create new curves
function CurveAddButton({
    setCurves,
    points,
    cellWidth,
    cellHeight,
    setAlertMessage,
}) {
    //If the user is inputting a new curve, the "+" is removed
    const [addingCurve, setAddingCurve] = useState(false);

    if (!addingCurve) {
        return <Add onClick={() => setAddingCurve(true)} />;
    } else {
        return (
            //The UI to define a new curve
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
