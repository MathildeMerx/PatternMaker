import { DeleteOutlined } from "@mui/icons-material";
import CurveAddButton from "./CurveAddButton";
import S_ControlledHeightUL from "../S_ControlledHeightUL";
import S_AlertMessage from "../S_AlertMessage";
import S_DisplaySectionTitle from "../../Theme/S_DisplaySectionTitle";
import S_DisplaySectionSubtitle from "../../Theme/S_DisplaySectionSubtitle";
import styled from "styled-components";
import alertMessageReadable from "../alertMessageReadable";

//List of the existing curves
function CurvesDisplay({
    points,
    curves,
    setCurves,
    height,
    cellSize,
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

    let alert = alertMessage.alertType.includes("Curve")
        ? alertMessageReadable(alertMessage)
        : null;

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
                                {`[${curv.startPoint}, ${curv.endPoint}]`}
                                <sub>{`(${curv.controlPoint[0].toFixed(
                                    1
                                )}, ${curv.controlPoint[1].toFixed(1)})`}</sub>
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
                    cellSize={cellSize}
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
