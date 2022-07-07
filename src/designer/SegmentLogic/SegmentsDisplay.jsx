import { DeleteOutlined } from "@mui/icons-material";
import SegmentAddButton from "./SegmentAddButton";
import S_ControlledHeightUL from "../S_ControlledHeightUL";
import S_AlertMessage from "../S_AlertMessage";
import S_DisplaySectionTitle from "../../Theme/S_DisplaySectionTitle";
import S_DisplaySectionSubtitle from "../../Theme/S_DisplaySectionSubtitle";
import styled from "styled-components";
import alertMessageReadable from "../alertMessageReadable";

//A list of the existing segments, displayed aside
function SegmentsDisplay({
    points,
    segments,
    setSegments,
    alertMessage,
    setAlertMessage,
    height,
}) {
    //Deleting a segment - when clicking on the bin button
    function clickDeleteSegment(seg) {
        setSegments((segment) =>
            segment.filter(
                (value) => !(value[0] === seg[0] && value[1] === seg[1])
            )
        );
    }

    let alert = alertMessage.alertType.includes("Segment")
        ? alertMessageReadable(alertMessage)
        : null;

    return (
        <div>
            <S_DisplaySectionTitle marginTop={true}>
                Segments
            </S_DisplaySectionTitle>

            {/*A list of the existing segments */}
            {segments.length > 0 ? (
                <S_ControlledHeightUL height={height}>
                    {segments.map((seg) => (
                        <S_li key={seg[0] + seg[1]}>
                            {`[${seg[0]}, ${seg[1]}]`}
                            <S_DeleteOutlined
                                onClick={() => clickDeleteSegment(seg)}
                            />
                        </S_li>
                    ))}
                </S_ControlledHeightUL>
            ) : null}

            {/*The error message if existing */}
            {alert ? <S_AlertMessage>{alert}</S_AlertMessage> : null}

            {/*A button to add new segments */}
            {Object.keys(points).length > 1 ? (
                <SegmentAddButton
                    points={points}
                    setSegments={setSegments}
                    setAlertMessage={setAlertMessage}
                />
            ) : (
                <S_DisplaySectionSubtitle>
                    Two points needed to create a segment.
                </S_DisplaySectionSubtitle>
            )}
        </div>
    );
}

const S_DeleteOutlined = styled(DeleteOutlined)`
    cursor: pointer;
    margin-left: 8px;
    position: relative;
    top: 6px;

    &:hover {
        color: ${({ theme }) => theme.colours.negative};
    }
`;

//Needed to remove the scrollbar: otherwise the height doesn't take into
//account the height of the bin icon and there's always a scroll bar
const S_li = styled.li`
    margin-bottom: 3px;
`;

export default SegmentsDisplay;
