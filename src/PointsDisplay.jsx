import { InfoOutlineIcon } from "@chakra-ui/icons";
import { S_ControlledHeightUL } from "./S_ControlledHeightUL";
import { S_HoverInfoIcon } from "./S_HoverInfoIcon";

function PointsDisplay({ points }) {
    return (
        <>
            <h2>
                Points
                <S_HoverInfoIcon>
                    <InfoOutlineIcon />
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
                            <li key={point}>
                                {`${point} (${points[point][0]}, ${points[point][1]})`}
                            </li>
                        ))}
                </S_ControlledHeightUL>
            ) : null}
        </>
    );
}

export { PointsDisplay };
