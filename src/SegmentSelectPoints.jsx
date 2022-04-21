import { ExpandMore } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { S_CancelButton, S_ValidateButton } from "./Theme/Button";
import styled from "styled-components";
import {
    S_DropdownButton,
    S_DropdownContent,
    S_Dropdown,
    S_DropdownTitle,
} from "./dropdownStyledComponents";

function clickMenu(event, setNewSegment, index) {
    event.preventDefault();
    setNewSegment((newSegment) => {
        let newSegmentCopy = newSegment.slice();
        newSegmentCopy[index] = event.target.name;
        return newSegmentCopy;
    });
}

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

function DropdownMenu({ points, newSegment, setNewSegment, index }) {
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

function addSegment(
    event,
    newSegment,
    setSegments,
    setAddingSegment,
    setAlertMessage
) {
    event.preventDefault();
    setSegments((segments) => {
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

const Submit = styled.div`
    margin-top: 8px;
`;

export { SegmentSelectPoints };
