import { Add } from "@mui/icons-material";
import { useState } from "react";
import { SegmentSelectPoints } from "./SegmentSelectPoints";

function SegmentAddButton({ points, setSegments, setAlertMessage }) {
    const [addingSegment, setAddingSegment] = useState(false);

    if (!addingSegment) {
        return <Add onClick={() => setAddingSegment(true)} />;
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
