import { ChevronDownIcon } from "@chakra-ui/icons";
import { useState } from "react";

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
        <button
            className="dropdown-button"
            name={pointName[0]}
            onClick={(e) => clickMenu(e, setNewSegment, index)}
        >
            {pointName[0]}
        </button>
    );
}

function DropdownMenu({ existingPoints, newSegment, setNewSegment, index }) {
    return (
        <div className="dropdown">
            <div className="dropdown-content">
                {existingPoints.map((pointName) => {
                    return (
                        <DropdownItem
                            pointName={pointName}
                            key={pointName[0]}
                            setNewSegment={setNewSegment}
                            index={index}
                        />
                    );
                })}
            </div>
            <div className="dropdown-title">
                <div>{newSegment[index] ?? "Point"}</div> <ChevronDownIcon />
            </div>
        </div>
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
            newSegment[1] === null
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

function ChooseSegmentPoints({
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

export { DropdownMenu, ChooseSegmentPoints };
