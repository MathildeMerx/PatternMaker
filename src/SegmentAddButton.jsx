import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { SegmentSelectPoints } from "./SegmentSelectPoints";

function SegmentAddButton({ points, setSegments, setAlertMessage }) {
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
                points={points}
                setSegments={setSegments}
                setAddingSegment={setAddingSegment}
                setAlertMessage={setAlertMessage}
            />
        );
    }
}

export { SegmentAddButton };
