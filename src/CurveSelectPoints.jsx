import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { areArraysEqual } from "./areArraysEqual";
import { midPoint } from "./midPoint";

function clickMenu(event, setNewCurve, index) {
    event.preventDefault();
    setNewCurve((newCurve) => {
        let newCurveCopy = newCurve.slice();
        newCurveCopy[index] = event.target.name;
        return newCurveCopy;
    });
}

function DropdownItem({ pointName, setNewCurve, index }) {
    return (
        <button
            className="dropdown-button"
            name={pointName[0]}
            onClick={(e) => clickMenu(e, setNewCurve, index)}
        >
            {pointName[0]}
        </button>
    );
}

function DropdownMenu({ existingPoints, newCurve, setNewCurve, index }) {
    return (
        <div className="dropdown">
            <div className="dropdown-content">
                {Object.keys(existingPoints)
                    .sort()
                    .map((pointName) => {
                        return (
                            <DropdownItem
                                pointName={pointName}
                                key={pointName[0]}
                                setNewCurve={setNewCurve}
                                index={index}
                            />
                        );
                    })}
            </div>
            <div className="dropdown-title">
                <div>{newCurve[index] ?? "Point"}</div> <ChevronDownIcon />
            </div>
        </div>
    );
}

function addCurve(event, newCurve, setCurves, setAddingCurve, existingPoints) {
    event.preventDefault();
    const futureCurve = [
        newCurve[0],
        newCurve[1],
        ...midPoint(existingPoints, newCurve[0], newCurve[1]),
    ];
    setCurves((curves) => {
        if (
            curves.some(
                ([start, end, ...rest]) =>
                    areArraysEqual([start, end, ...rest], futureCurve) ||
                    areArraysEqual([end, start, ...rest], futureCurve)
            ) ||
            futureCurve[0] === null ||
            futureCurve[1] === null ||
            futureCurve[0] === futureCurve[1]
        ) {
            return curves;
        } else {
            let curvesCopy = curves.slice();
            curvesCopy.push(futureCurve);
            return curvesCopy;
        }
    });
    setAddingCurve(false);
}

function CurveSelectPoints({ existingPoints, setCurves, setAddingCurve }) {
    const [newCurve, setNewCurve] = useState([null, null, null, null]);
    return (
        <div>
            Curve from
            <DropdownMenu
                existingPoints={existingPoints}
                newCurve={newCurve}
                setNewCurve={setNewCurve}
                index={0}
            />
            to
            <DropdownMenu
                existingPoints={existingPoints}
                newCurve={newCurve}
                setNewCurve={setNewCurve}
                index={1}
            />
            <button
                onClick={(event) =>
                    addCurve(
                        event,
                        newCurve,
                        setCurves,
                        setAddingCurve,
                        existingPoints
                    )
                }
            >
                Validate
            </button>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setAddingCurve(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}

export { CurveSelectPoints };
