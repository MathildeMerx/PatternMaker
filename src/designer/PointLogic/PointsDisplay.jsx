import S_ControlledHeightUL from "../General/S_ControlledHeightUL";
import S_DisplaySectionTitle from "../../Theme/S_DisplaySectionTitle";
import S_DisplaySectionSubtitle from "../../Theme/S_DisplaySectionSubtitle";
import styled from "styled-components";

//Displaying the existing points in an unordered list
function PointsDisplay({ points, height }) {
    return (
        <>
            <S_DisplaySectionTitle marginTop={false}>
                Points
            </S_DisplaySectionTitle>
            <S_DisplaySectionSubtitle>
                Click on a point to delete it. Drag'n'drop a point to move it.
            </S_DisplaySectionSubtitle>

            {/*If there are no points, nothing is shown, 
            else a list of all of them is displayed */}
            {Object.keys(points).length !== 0 ? (
                <S_ControlledHeightUL height={height}>
                    {Object.keys(points)
                        .sort((a, b) => {
                            if (a.length === b.length) {
                                if (a[0] === b[0] || a.length === 1) {
                                    return a < b ? -1 : 1;
                                }
                                return a[1] < b[1] ? -1 : 1;
                            }
                            return a.length < b.length ? -1 : 1;
                        })
                        .map((point) => (
                            <S_li key={point}>
                                {`${point} (${points[point][0]}, ${points[point][1]})`}
                            </S_li>
                        ))}
                </S_ControlledHeightUL>
            ) : null}
        </>
    );
}

//To respect the height of segment display (and improve uniformity)
const S_li = styled.li`
    height: 28px;
`;

export default PointsDisplay;
