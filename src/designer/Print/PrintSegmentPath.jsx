function PrintSegmentPath({ points, seg }) {
    const startPoint = seg[0];
    const endPoint = seg[1];
    return (
        <path
            d={`M ${points[startPoint][0]} ${points[startPoint][1]}
          L ${points[endPoint][0]} ${points[endPoint][1]}`}
            fill="none"
            stroke="black"
            strokeWidth="0.1"
        ></path>
    );
}

export default PrintSegmentPath;
