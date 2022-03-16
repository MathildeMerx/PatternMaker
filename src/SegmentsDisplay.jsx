import { DeleteIcon } from "@chakra-ui/icons";
import { SegmentAddButton } from "./SegmentAddButton";

function clickDeleteSegment(seg, segments, setSegments) {
    let segmentsCopy = segments.slice();
    segmentsCopy = segmentsCopy.filter((value) => {
        if (value.length === 2) {
            return !((value[0] === seg[0]) & (value[1] === seg[1]));
        } else {
            return false;
        }
    });
    setSegments(segmentsCopy);
}

function DeleteSegment({ seg, segments, setSegments }) {
    return (
        <button onClick={() => clickDeleteSegment(seg, segments, setSegments)}>
            <DeleteIcon />
        </button>
    );
}

function SegmentsDisplay({ existingPoints, segments, setSegments }) {
    return (
        <div>
            <h3>Segments</h3>

            {segments.length > 0 ? (
                <ul className="controlled-height">
                    {segments.map((seg) => {
                        if (seg.length === 2) {
                            return (
                                <li key={seg[0] + seg[1]}>
                                    {`[${seg[0]}, ${seg[1]}]`}{" "}
                                    <DeleteSegment
                                        seg={seg}
                                        segments={segments}
                                        setSegments={setSegments}
                                    />
                                </li>
                            );
                        } else {
                            return null;
                        }
                    })}{" "}
                </ul>
            ) : null}
            {Object.keys(existingPoints).length > 1 ? (
                <SegmentAddButton
                    existingPoints={existingPoints}
                    setSegments={setSegments}
                />
            ) : null}
        </div>
    );
}

export { SegmentsDisplay };
