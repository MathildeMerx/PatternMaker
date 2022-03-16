function PointsDisplay({ existingPoints }) {
    return (
        <>
            <h3>Points</h3>
            <ul className="controlled-height">
                {Object.keys(existingPoints)
                    .sort()
                    .map((point) => (
                        <li key={point}>
                            {`${point} (${existingPoints[point][0]}, ${existingPoints[point][1]})`}
                        </li>
                    ))}
            </ul>
        </>
    );
}

export { PointsDisplay };
