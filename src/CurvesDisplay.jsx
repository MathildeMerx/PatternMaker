import { DeleteOutlined, InfoOutlined } from "@mui/icons-material";
import { CurveAddButton } from "./CurveAddButton";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";
import { S_AlertMessage } from "./S_AlertMessage";
import { S_HoverInfoIcon } from "./S_HoverInfoIcon";

//Deleting a curve - when clicking on the bin button
function clickDeleteCurve(curveIndex, setCurves) {
    setCurves((curves) => {
        let { [curveIndex]: index, ...rest } = curves;
        return rest;
    });
}

//Bin icon to delete a curve
function DeleteCurve({ curveIndex, setCurves }) {
    return (
        <DeleteOutlined
            onClick={() => clickDeleteCurve(curveIndex, setCurves)}
        />
    );
}

//List of the existing curves
function CurvesDisplay({
    points,
    curves,
    setCurves,
    cellWidth,
    cellHeight,
    alertMessage,
    setAlertMessage,
}) {
    let alert;

    //Message alerting the user in case of misuse
    if (alertMessage) {
        switch (alertMessage[0]) {
            case "deletePointCurve":
                alert = `Point ${alertMessage[1]} belongs to curve (${alertMessage[2][0]}, ${alertMessage[2][1]}), delete this
                    curve first!`;
                break;

            case "nullCurve":
                alert = "Fill in a value for both ends of the curve!";
                break;

            case "existingCurve":
                alert = "A perfectly similar curve already exists!";
                break;

            case "uniqueCurve":
                alert = "The start and end points should be different!";
                break;

            default:
                alert = "";
        }
    }

    return (
        <div>
            <h2>
                Curves
                <S_HoverInfoIcon>
                    <InfoOutlined />
                    <div>
                        To modify the shape of a curve, click on the curve in
                        the grid to make the control point appear.
                    </div>
                </S_HoverInfoIcon>
            </h2>
            {Object.keys(curves).length > 0 ? (
                <S_ControlledHeightUL>
                    {Object.entries(curves).map(([index, curv]) => {
                        return (
                            <li key={index}>
                                {`[${curv[0]}, ${curv[1]}]`}
                                <sub>{`(${curv[2].toFixed(
                                    1
                                )}, ${curv[3].toFixed(1)})`}</sub>
                                <DeleteCurve
                                    curveIndex={index}
                                    setCurves={setCurves}
                                />
                            </li>
                        );
                    })}
                </S_ControlledHeightUL>
            ) : null}
            <S_AlertMessage>{alert}</S_AlertMessage>
            {Object.keys(points).length > 1 ? (
                <CurveAddButton
                    points={points}
                    setCurves={setCurves}
                    cellHeight={cellHeight}
                    cellWidth={cellWidth}
                    setAlertMessage={setAlertMessage}
                />
            ) : null}
        </div>
    );
}

export { CurvesDisplay };
