import { DeleteIcon } from "@chakra-ui/icons";
import { CurveAddButton } from "./CurveAddButton";

function clickDeleteCurve(curv, setCurves) {
    setCurves((curve) =>
        curve.filter(
            (value) =>
                !(
                    value[0] === curv[0] &&
                    value[1] === curv[1] &&
                    value[2] === curv[2] &&
                    value[3] === curv[3]
                )
        )
    );
}

function DeleteCurve({ curv, setCurves }) {
    return (
        <button onClick={() => clickDeleteCurve(curv, setCurves)}>
            <DeleteIcon />
        </button>
    );
}

function CurvesDisplay({ existingPoints, curves, setCurves }) {
    return (
        <div>
            <h3>Curves</h3>

            {curves.length > 0 ? (
                <ul className="controlled-height">
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
                                <sub>{`(${curv[2]}, ${curv[3]})`}</sub>
                                <DeleteCurve
                                    curv={curv}
                                    setCurves={setCurves}
                                />
                            </li>
                        );
                    })}
                </ul>
            ) : null}
            {Object.keys(existingPoints).length > 1 ? (
                <CurveAddButton
                    existingPoints={existingPoints}
                    setCurves={setCurves}
                />
            ) : null}
        </div>
    );
}

export { CurvesDisplay };
