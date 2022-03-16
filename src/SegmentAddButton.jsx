import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { SegmentSelectPoints } from "./SegmentSelectPoints";

function SegmentAddButton({ existingPoints, setSegments }) {
    const [addingSegment, setAddingSegment] = useState(false);

    if (!addingSegment) {
        return (
            <button onClick={() => setAddingSegment(true)}>
                <AddIcon />
            </button>
        );
    } else {
        return (
            <SegmentSelectPoints
                existingPoints={existingPoints}
                setSegments={setSegments}
                setAddingSegment={setAddingSegment}
            />
        );
    }
}

export { SegmentAddButton };
