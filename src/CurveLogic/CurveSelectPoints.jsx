import { ExpandMore } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { areArraysEqual } from "./areArraysEqual";
import { midPoint } from "./midPoint";
import {
    S_DropdownButton,
    S_DropdownContent,
    S_Dropdown,
    S_DropdownTitle,
} from "../dropdownStyledComponents";
import { S_CancelButton, S_ValidateButton } from "../Theme/Button";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

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

function DropdownMenu({ points, newCurve, setNewCurve, index }) {
    const dropdownRef = useRef();
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef, setClicked]);
    return (
        <S_Dropdown ref={dropdownRef} onClick={() => setClicked(!clicked)}>
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
                                key={pointName[0]}
                                setNewCurve={setNewCurve}
                                index={index}
                            />
                        );
                    })}
            </S_DropdownContent>
        </S_Dropdown>
    );
}

function addCurve(
    event,
    newCurve,
    setCurves,
    setAddingCurve,
    points,
    cellWidth,
    cellHeight,
    setAlertMessage
) {
    event.preventDefault();
    const futureCurve = [
        newCurve[0],
        newCurve[1],
        ...midPoint(points, newCurve[0], newCurve[1], cellWidth, cellHeight),
    ];
    setCurves((curves) => {
        if (
            Object.values(curves).some(
                ([start, end, ...rest]) =>
                    areArraysEqual([start, end, ...rest], futureCurve) ||
                    areArraysEqual([end, start, ...rest], futureCurve)
            )
        ) {
            setAlertMessage(["existingCurve", futureCurve]);
            return curves;
        } else if (futureCurve[0] === null || futureCurve[1] === null) {
            setAlertMessage(["nullCurve", futureCurve]);
            return curves;
        } else if (futureCurve[0] === futureCurve[1]) {
            setAlertMessage(["uniqueCurve", futureCurve]);
            return curves;
        } else {
            let curvesCopy = JSON.parse(JSON.stringify(curves));
            curvesCopy[uuidv4()] = futureCurve;
            return curvesCopy;
        }
    });
    setAddingCurve(false);
}

function CurveSelectPoints({
    points,
    setCurves,
    setAddingCurve,
    cellWidth,
    cellHeight,
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
            <Submit>
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
                            cellWidth,
                            cellHeight,
                            setAlertMessage
                        )
                    }
                >
                    Validate
                </S_ValidateButton>
            </Submit>
        </>
    );
}

const Submit = styled.div`
    margin-top: 8px;
`;

export { CurveSelectPoints };
