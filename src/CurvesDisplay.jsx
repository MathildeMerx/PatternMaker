import { DeleteIcon } from "@chakra-ui/icons";
import { CurveAddButton } from "./CurveAddButton";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";
import { S_AlertMessage } from "./S_AlertMessage";

function clickDeleteCurve(curveIndex, setCurves) {
    setCurves((curves) => {
        let { [curveIndex]: index, ...rest } = curves;
        return rest;
    });
}

function DeleteCurve({ curveIndex, setCurves }) {
    return (
        <button onClick={() => clickDeleteCurve(curveIndex, setCurves)}>
            <DeleteIcon />
        </button>
    );
}

function CurvesDisplay({
    existingPoints,
    curves,
    setCurves,
    cellWidth,
    cellHeight,
    alertDeletePoint,
}) {
    return (
        <div>
            <h2>Curves</h2>

            {Object.keys(curves).length > 0 ? (
                <S_ControlledHeightUL>
                    {Object.entries(curves).map(([index, curv]) => {
                        return (
                            <li key={index}>
                                {`[${curv[0]}, ${curv[1]}]`}
                                <sub>{`(${curv[2].toFixed(
                                    2
                                )}, ${curv[3].toFixed(2)})`}</sub>
                                <DeleteCurve
                                    curveIndex={index}
                                    setCurves={setCurves}
                                />
                            </li>
                        );
                    })}
                </S_ControlledHeightUL>
            ) : null}
            {alertDeletePoint ? (
                alertDeletePoint[0] === "curv" ? (
                    <S_AlertMessage>
                        Point {alertDeletePoint[1]} belongs to curve (
                        {alertDeletePoint[2][0]}, {alertDeletePoint[2][1]}),
                        delete this curve first!
                    </S_AlertMessage>
                ) : null
            ) : null}
            {Object.keys(existingPoints).length > 1 ? (
                <CurveAddButton
                    existingPoints={existingPoints}
                    setCurves={setCurves}
                    cellHeight={cellHeight}
                    cellWidth={cellWidth}
                />
            ) : null}
        </div>
    );
}

export { CurvesDisplay };
