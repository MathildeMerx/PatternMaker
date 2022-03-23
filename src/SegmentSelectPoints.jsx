import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";
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

function DropdownMenu({ existingPoints, newSegment, setNewSegment, index }) {
    return (
        <S_Dropdown>
            <S_DropdownContent>
                {Object.keys(existingPoints)
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
            <S_DropdownTitle>
                <div>{newSegment[index] ?? "Point"}</div> <ChevronDownIcon />
            </S_DropdownTitle>
        </S_Dropdown>
    );
}

function addSegment(event, newSegment, setSegments, setAddingSegment) {
    event.preventDefault();
    setSegments((segments) => {
        if (
            segments.some(
                ([a, b]) =>
                    (a === newSegment[0]) & (b === newSegment[1]) ||
                    (b === newSegment[0]) & (a === newSegment[1])
            ) ||
            newSegment[0] === null ||
            newSegment[1] === null ||
            newSegment[0] === newSegment[1]
        ) {
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
    existingPoints,
    setSegments,
    setAddingSegment,
}) {
    const [newSegment, setNewSegment] = useState([null, null]);
    return (
        <div>
            Segment from
            <DropdownMenu
                existingPoints={existingPoints}
                newSegment={newSegment}
                setNewSegment={setNewSegment}
                index={0}
            />
            to
            <DropdownMenu
                existingPoints={existingPoints}
                newSegment={newSegment}
                setNewSegment={setNewSegment}
                index={1}
            />
            <button
                onClick={(event) =>
                    addSegment(event, newSegment, setSegments, setAddingSegment)
                }
            >
                Validate
            </button>
            <button
                onClick={(event) => {
                    event.preventDefault();
                    setAddingSegment(false);
                }}
            >
                Cancel
            </button>
        </div>
    );
}

export { SegmentSelectPoints };
