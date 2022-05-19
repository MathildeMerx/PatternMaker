import { DeleteOutlined } from "@mui/icons-material";
import CurveAddButton from "./CurveAddButton";
import S_ControlledHeightUL from "../S_ControlledHeightUL";
import S_AlertMessage from "../S_AlertMessage";
import S_DisplaySectionTitle from "../Theme/S_DisplaySectionTitle";
import S_DisplaySectionSubtitle from "../Theme/S_DisplaySectionSubtitle";
import styled from "styled-components";

//List of the existing curves
function CurvesDisplay({
    points,
    curves,
    setCurves,
    height,
    cellWidth,
    cellHeight,
    alertMessage,
    setAlertMessage,
}) {
    //Deleting a curve - when clicking on the bin button
    function clickDeleteCurve(curveIndex) {
        setCurves((curves) => {
            let { [curveIndex]: index, ...rest } = curves;
            return rest;
        });
    }
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
            <S_DisplaySectionTitle marginTop={true}>
                Curves
            </S_DisplaySectionTitle>
            <S_DisplaySectionSubtitle>
                Click on the curve in the grid to make the control point appear.
            </S_DisplaySectionSubtitle>
            {/*The list of the curves */}
            {Object.keys(curves).length > 0 ? (
                <S_ControlledHeightUL height={height}>
                    {Object.entries(curves).map(([index, curv]) => {
                        return (
                            <li key={index}>
                                {`[${curv[0]}, ${curv[1]}]`}
                                <sub>{`(${curv[2].toFixed(
                                    1
                                )}, ${curv[3].toFixed(1)})`}</sub>
                                <S_DeleteOutlined
                                    onClick={() =>
                                        clickDeleteCurve(index, setCurves)
                                    }
                                />
                            </li>
                        );
                    })}
                </S_ControlledHeightUL>
            ) : null}
            {/*The alert message if exsting */}
            {alert ? <S_AlertMessage>{alert}</S_AlertMessage> : null}
            {/*If there are more than 2 points, a '+' to create new curves */}
            {Object.keys(points).length > 1 ? (
                <CurveAddButton
                    points={points}
                    setCurves={setCurves}
                    cellHeight={cellHeight}
                    cellWidth={cellWidth}
                    setAlertMessage={setAlertMessage}
                />
            ) : (
                <S_DisplaySectionSubtitle>
                    Two points needed to create a curve.
                </S_DisplaySectionSubtitle>
            )}
        </div>
    );
}

const S_DeleteOutlined = styled(DeleteOutlined)`
    cursor: pointer;
    margin-left: 8px;
    position: relative;
    top: 6px;

    &:hover {
        color: ${({ theme }) => theme.colours.negative};
    }
`;

export default CurvesDisplay;
