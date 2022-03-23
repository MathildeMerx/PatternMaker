import { DeleteIcon } from "@chakra-ui/icons";
import { SegmentAddButton } from "./SegmentAddButton";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";

function clickDeleteSegment(seg, setSegments) {
    setSegments((segment) =>
        segment.filter((value) => !(value[0] === seg[0] && value[1] === seg[1]))
    );
}

function DeleteSegment({ seg, setSegments }) {
    return (
        <button onClick={() => clickDeleteSegment(seg, setSegments)}>
            <DeleteIcon />
        </button>
    );
}

function SegmentsDisplay({ existingPoints, segments, setSegments }) {
    return (
        <div>
            <h3>Segments</h3>

            {segments.length > 0 ? (
                <S_ControlledHeightUL>
                    {segments.map((seg) => (
                        <li key={seg[0] + seg[1]}>
                            {`[${seg[0]}, ${seg[1]} ]`}
                            <DeleteSegment
                                seg={seg}
                                setSegments={setSegments}
                            />
                        </li>
                    ))}
                </S_ControlledHeightUL>
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
