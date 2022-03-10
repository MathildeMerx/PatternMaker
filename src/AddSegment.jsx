import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { ChooseSegmentPoints } from "./DropdownMenu";

function AddSegment({ existingPoints, setSegments }) {
    const [addingSegment, setAddingSegment] = useState(false);

    if (!addingSegment) {
        return (
            <button onClick={() => setAddingSegment(true)}>
                {" "}
                <AddIcon />
            </button>
        );
    } else {
        return (
            <ChooseSegmentPoints
                existingPoints={existingPoints}
                setSegments={setSegments}
                setAddingSegment={setAddingSegment}
            />
        );
    }
}

export { AddSegment };
