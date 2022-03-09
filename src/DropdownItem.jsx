function clickMenu(event, segments, setSegments) {
    event.preventDefault();
    console.log(event);
    const numSegments = segments.length;
    let segmentCopy = segments.slice();
    if (segments[numSegments - 1].length === 1) {
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
            onclick={(e) => clickMenu(e, segments, setSegments)}
        >
            {pointName[0]}
        </button>
    );
}

export { DropdownItem };
