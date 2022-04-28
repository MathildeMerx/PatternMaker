import { InfoOutlined } from "@mui/icons-material";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";
import { S_HoverInfoIcon } from "./S_HoverInfoIcon";
import styled from "styled-components";

function PointsDisplay({ points }) {
    return (
        <>
            <h2>
                Points
                <S_HoverInfoIcon>
                    <InfoOutlined />
                    <div>
                        Click in the grid to create a point. You can drag'n'drop
                        points, or click on one to delete it.
                    </div>
                </S_HoverInfoIcon>
            </h2>
            {Object.keys(points).length !== 0 ? (
                <S_ControlledHeightUL>
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

//To respect the height of segment display
const S_li = styled.li`
    height: 28px;
`;
