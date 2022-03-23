import { S_ControlledHeightUL } from "./S_ControlledHeightUL";

function PointsDisplay({ existingPoints }) {
    return (
        <>
            <h3>Points</h3>
            <S_ControlledHeightUL>
                {Object.keys(existingPoints)
                    .sort()
                    .map((point) => (
                        <li key={point}>
                            {`${point} (${existingPoints[point][0]}, ${existingPoints[point][1]})`}
                        </li>
                    ))}
            </S_ControlledHeightUL>
        </>
    );
}

export { PointsDisplay };
