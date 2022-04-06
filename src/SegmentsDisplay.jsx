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
    alertMessage,
    setAlertMessage,
}) {
    let alert;

    if (alertMessage) {
        switch (alertMessage[0]) {
            case "deletePointSegment":
                alert = `Point ${alertMessage[1]} belongs to segment [${alertMessage[2][0]}, ${alertMessage[2][1]}], delete this
                    segment first!`;
                break;

            case "nullSegment":
                alert = "Fill in a value for both ends of the segment!";
                break;

            case "existingSegment":
                alert = "The same segment already exists!";
                break;

            default:
                alert = "";
        }
    }
    return (
        <div>
            <h3>Segments</h3>

            {segments.length > 0 ? (
                <S_ControlledHeightUL>
                    {segments.map((seg) => (
                        <li key={seg[0] + seg[1]}>
                            {`[${seg[0]}, ${seg[1]}]`}
                            <DeleteSegment
                                seg={seg}
                                setSegments={setSegments}
                            />
                        </li>
                    ))}
                </S_ControlledHeightUL>
            ) : null}
            <S_AlertMessage>{alert}</S_AlertMessage>
            {Object.keys(existingPoints).length > 1 ? (
                <SegmentAddButton
                    existingPoints={existingPoints}
                    setSegments={setSegments}
                    setAlertMessage={setAlertMessage}
                />
            ) : null}
        </div>
    );
}

export { SegmentsDisplay };
