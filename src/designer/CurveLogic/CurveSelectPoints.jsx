import { ExpandMore } from "@mui/icons-material";
import { useState } from "react";
import areCurvesEqual from "./areCurvesEqual";
import midPoint from "./midPoint";
import {
    S_DropdownButton,
    S_DropdownContent,
    S_Dropdown,
    S_DropdownTitle,
} from "../dropdownStyledComponents";
import { S_CancelButton, S_ValidateButton } from "../../Theme/Button";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import useCloseClickOutside from "../useCloseClickOutside";

//Interface to create a new curve: two dropdown menus, one for each end point
function CurveSelectPoints({
    points,
    setCurves,
    setAddingCurve,
    cellSize,
    setAlertMessage,
}) {
    const [newCurve, setNewCurve] = useState([null, null, null, null]);
    return (
        <>
            <div>
                Curve from
                <DropdownMenu
                    points={points}
                    newCurve={newCurve}
                    setNewCurve={setNewCurve}
                    index={0}
                />
                to
                <DropdownMenu
                    points={points}
                    newCurve={newCurve}
                    setNewCurve={setNewCurve}
                    index={1}
                />
            </div>

            <S_Submit>
                <S_CancelButton
                    onClick={(event) => {
                        event.preventDefault();
                        setAddingCurve(false);
                    }}
                >
                    Cancel
                </S_CancelButton>

                <S_ValidateButton
                    onClick={(event) =>
                        addCurve(
                            event,
                            newCurve,
                            setCurves,
                            setAddingCurve,
                            points,
                            cellSize,
                            setAlertMessage
                        )
                    }
                >
                    Validate
                </S_ValidateButton>
            </S_Submit>
        </>
    );
}

function addCurve(
    event,
    newCurve,
    setCurves,
    setAddingCurve,
    points,
    cellSize,
    setAlertMessage
) {
    event.preventDefault();

    //That's the default control point: the middle between both end points
    const futureCurve = {
        startPoint: newCurve[0],
        endPoint: newCurve[1],
        controlPoint: midPoint(points, newCurve[0], newCurve[1]),
    };

    setCurves((prevCurves) => {
        //If the new curve is wrong (one point hasn't been filled in,
        //or both end points are the same, or the curve already exists),
        //no new curve is added. And a relevant error message is issued
        if (
            Object.values(prevCurves).some(
                (existingCurve) =>
                    areCurvesEqual(existingCurve, futureCurve) ||
                    areCurvesEqual(existingCurve, futureCurve)
            )
        ) {
            setAlertMessage({ alertType: "existingCurve" });
            return prevCurves;
        } else if (
            futureCurve.startPoint === null ||
            futureCurve.endPoint === null
        ) {
            setAlertMessage({ alertType: "nullCurve" });
            return prevCurves;
        } else if (futureCurve.startPoint === futureCurve.endPoint) {
            setAlertMessage({ alertType: "uniquePointCurve" });
            return prevCurves;
        } else {
            return { ...prevCurves, [uuidv4()]: futureCurve };
        }
    });
    setAddingCurve(false);
}

//Dropdown menu to select both end points of a new curve
function DropdownMenu({ points, newCurve, setNewCurve, index }) {
    // Knowing whether the menu is open or not,
    // to close it when a user clicks outside of it
    const [[clicked, setClicked], dropdownRef] = useCloseClickOutside();
    return (
        <S_Dropdown ref={dropdownRef} onClick={() => setClicked(!clicked)}>
            {/*When the menu is closed, it'll show the chosen point
            (or "Points" if no point was chosen yet*/}
            <S_DropdownTitle>
                <div>{newCurve[index] ?? "Point"}</div> <ExpandMore />
            </S_DropdownTitle>

            <S_DropdownContent clicked={clicked}>
                {Object.keys(points)
                    .sort()
                    .map((pointName) => {
                        return (
                            <DropdownItem
                                pointName={pointName}
                                key={pointName}
                                setNewCurve={setNewCurve}
                                index={index}
                            />
                        );
                    })}
            </S_DropdownContent>
        </S_Dropdown>
    );
}

//All the possible points in the dropdown menu
function DropdownItem({ pointName, setNewCurve, index }) {
    return (
        <S_DropdownButton
            name={pointName}
            onClick={(e) => clickMenu(e, setNewCurve, index)}
        >
            {pointName}
        </S_DropdownButton>
    );
}

//When clicking on a point in the dropdown menu,
//it pick an end point for the new curve
function clickMenu(event, setNewCurve, index) {
    event.preventDefault();
    setNewCurve((newCurve) => {
        let newCurveCopy = newCurve.slice();
        newCurveCopy[index] = event.target.name;
        return newCurveCopy;
    });
}

const S_Submit = styled.div`
    margin-top: 8px;
`;

export default CurveSelectPoints;
