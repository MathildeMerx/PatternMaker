import { ExpandMore } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { S_CancelButton, S_ValidateButton } from "../Theme/Button";
import styled from "styled-components";
import {
    S_DropdownButton,
    S_DropdownContent,
    S_Dropdown,
    S_DropdownTitle,
} from "../dropdownStyledComponents";

//Interface to create a new segment: two dropdown menus, one for each end point
function SegmentSelectPoints({
    points,
    setSegments,
    setAddingSegment,
    setAlertMessage,
}) {
    const [newSegment, setNewSegment] = useState([null, null]);
    return (
        <div>
            Segment from
            <DropdownMenu
                points={points}
                newSegment={newSegment}
                setNewSegment={setNewSegment}
                index={0}
            />
            to
            <DropdownMenu
                points={points}
                newSegment={newSegment}
                setNewSegment={setNewSegment}
                index={1}
            />
            <Submit>
                <S_CancelButton
                    onClick={(event) => {
                        event.preventDefault();
                        setAddingSegment(false);
                    }}
                >
                    Cancel
                </S_CancelButton>
                <S_ValidateButton
                    onClick={(event) =>
                        addSegment(
                            event,
                            newSegment,
                            setSegments,
                            setAddingSegment,
                            setAlertMessage
                        )
                    }
                >
                    Validate
                </S_ValidateButton>
            </Submit>
        </div>
    );
}

//This function is called when the user validates the creation of a segment
function addSegment(
    event,
    newSegment,
    setSegments,
    setAddingSegment,
    setAlertMessage
) {
    event.preventDefault();

    setSegments((segments) => {
        //If the new segment is wrong (one point hasn't been filled in,
        //or both end points are the same, or the segment already exists),
        //no new segment is added. And a relevant error message is issued
        if (
            segments.some(
                ([a, b]) =>
                    (a === newSegment[0]) & (b === newSegment[1]) ||
                    (b === newSegment[0]) & (a === newSegment[1])
            )
        ) {
            setAlertMessage(["existingSegment", newSegment]);
            return segments;
        } else if (newSegment[0] === null || newSegment[1] === null) {
            setAlertMessage(["nullSegment", newSegment]);
            return segments;
        } else if (newSegment[0] === newSegment[1]) {
            setAlertMessage(["uniqueSegment", newSegment]);
            return segments;
        } else {
            let segmentsCopy = segments.slice();
            segmentsCopy.push(newSegment);
            return segmentsCopy;
        }
    });
    setAddingSegment(false);
}

//Dropdown menu to select both end points of a new segment
function DropdownMenu({ points, newSegment, setNewSegment, index }) {
    //Referencing the dropdown menu
    const dropdownRef = useRef();

    //Knowing whether the menu is open or not
    const [clicked, setClicked] = useState(false);

    //When the menu is down, clicking elsewhere will close it.
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
            {/*When the menu is closed, it'll show the chosen point
            (or "Points" if no point was chosen yet*/}
            <S_DropdownTitle>
                <div>{newSegment[index] ?? "Point"}</div> <ExpandMore />
            </S_DropdownTitle>

            <S_DropdownContent clicked={clicked}>
                {Object.keys(points)
                    .sort()
                    .map((pointName) => {
                        return (
                            <DropdownItem
                                pointName={pointName}
                                key={pointName}
                                setNewSegment={setNewSegment}
                                index={index}
                            />
                        );
                    })}
            </S_DropdownContent>
        </S_Dropdown>
    );
}

//All the possible points in the dropdown menu
function DropdownItem({ pointName, setNewSegment, index }) {
    return (
        <S_DropdownButton
            name={pointName}
            onClick={(e) => clickMenu(e, setNewSegment, index)}
        >
            {pointName}
        </S_DropdownButton>
    );
}

//When clicking on a point in the dropdown menu,
//it pick an end point for the new segment
function clickMenu(event, setNewSegment, index) {
    event.preventDefault();
    setNewSegment((newSegment) => {
        let newSegmentCopy = newSegment.slice();
        newSegmentCopy[index] = event.target.name;
        return newSegmentCopy;
    });
}

const Submit = styled.div`
    margin-top: 8px;
`;

export { SegmentSelectPoints };
