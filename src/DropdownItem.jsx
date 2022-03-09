function clickMenu(event, segments, setSegments) {
    event.preventDefault();
    const numSegments = segments.length;
    let segmentCopy = segments.slice();
    if (numSegments === 0) {
        segmentCopy.push([event.target.name]);
    } else if (segments[numSegments - 1].length === 1) {
        segmentCopy[numSegments - 1].push(event.target.name);
    } else {
        segmentCopy.push([event.target.name]);
    }
    setSegments(segmentCopy);
}

function DropdownItem({ pointName, segments, setSegments }) {
    return (
        <button
            name={pointName[0]}
            onClick={(e) => clickMenu(e, segments, setSegments)}
        >
            {pointName[0]}
        </button>
    );
}

function DropdownMenu({ existingPoints, segments, setSegments }) {
    return (
        <div className="dropdown">
            <div className="dropdown-content">
                {existingPoints.map((pointName) => {
                    return (
                        <DropdownItem
                            pointName={pointName}
                            segments={segments}
                            setSegments={setSegments}
                            key={pointName[0]}
                        />
                    );
                })}
            </div>
            test
        </div>
    );
}

export { DropdownMenu };
