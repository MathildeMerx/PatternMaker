import { DeleteIcon } from "@chakra-ui/icons";
import { SegmentAddButton } from "./SegmentAddButton";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";
import { S_AlertMessage } from "./S_AlertMessage";

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

function SegmentsDisplay({
    existingPoints,
    segments,
    setSegments,
    alertDeletePoint,
}) {
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
            {alertDeletePoint ? (
                alertDeletePoint[0] === "seg" ? (
                    <S_AlertMessage>
                        Point {alertDeletePoint[1]} belongs to segment [
                        {alertDeletePoint[2][0]}, {alertDeletePoint[2][1]}],
                        delete this segment first!
                    </S_AlertMessage>
                ) : null
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
