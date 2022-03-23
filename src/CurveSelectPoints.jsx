import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { areArraysEqual } from "./areArraysEqual";
import { midPoint } from "./midPoint";
import {
    S_DropdownButton,
    S_DropdownContent,
    S_Dropdown,
    S_DropdownTitle,
} from "./dropdownStyledComponents";

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
        <S_DropdownButton
            name={pointName[0]}
            onClick={(e) => clickMenu(e, setNewCurve, index)}
        >
            {pointName[0]}
        </S_DropdownButton>
    );
}

function DropdownMenu({ existingPoints, newCurve, setNewCurve, index }) {
    return (
        <S_Dropdown>
            <S_DropdownContent>
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
            </S_DropdownContent>
            <S_DropdownTitle>
                <div>{newCurve[index] ?? "Point"}</div> <ChevronDownIcon />
            </S_DropdownTitle>
        </S_Dropdown>
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
