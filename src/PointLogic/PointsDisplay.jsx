import { InfoOutlined } from "@mui/icons-material";
import { S_ControlledHeightUL } from "../S_ControlledHeightUL";
import { S_HoverInfoIcon } from "../S_HoverInfoIcon";
import styled from "styled-components";

//Displaying the existing points in an unordered list
function PointsDisplay({ points, height }) {
    return (
        <>
            <h2>
                Points
                {/*Hoverable icon to explain the user how points work */}
                <S_HoverInfoIcon>
                    <InfoOutlined />
                    <div>
                        Click in the grid to create a point. You can drag'n'drop
                        points, or click on one to delete it.
                    </div>
                </S_HoverInfoIcon>
            </h2>

            {/*If there are no points, nothing is shown, 
            else a list of all of them is displayed */}
            {Object.keys(points).length !== 0 ? (
                <S_ControlledHeightUL height={height}>
                    {Object.keys(points)
                        .sort()
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

export { PointsDisplay };

//To respect the height of segment display (and improve uniformity)
const S_li = styled.li`
    height: 28px;
`;
