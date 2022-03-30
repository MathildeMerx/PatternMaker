import { DeleteIcon } from "@chakra-ui/icons";
import { CurveAddButton } from "./CurveAddButton";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";

function clickDeleteCurve(curveIndex, setCurves) {
    setCurves((curve) => curve.filter((value) => !(value[4] === curveIndex)));
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
}) {
    return (
        <div>
            <h2>Curves</h2>

            {curves.length > 0 ? (
                <S_ControlledHeightUL>
                    {curves.map((curv) => {
                        return (
                            <li
                                key={
                                    curv[0] +
                                    curv[1] +
                                    Math.floor(curv[2]) +
                                    Math.floor(curv[3])
                                }
                            >
                                {`[${curv[0]}, ${curv[1]}]`}{" "}
                                <sub>{`(${curv[2].toFixed(
                                    2
                                )}, ${curv[3].toFixed(2)})`}</sub>
                                <DeleteCurve
                                    curveIndex={curv[4]}
                                    setCurves={setCurves}
                                />
                            </li>
                        );
                    })}
                </S_ControlledHeightUL>
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
