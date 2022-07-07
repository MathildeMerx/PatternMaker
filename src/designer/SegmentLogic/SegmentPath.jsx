import { useTheme } from "styled-components";

function SegmentPath({ segment, points, cellSize }) {
    //theme needed for the color of the segment
    const theme = useTheme();
    const startPoint = segment[0];
    const endPoint = segment[1];

    //The coordinates of the end points of the segment
    const startAbscissa = points[startPoint][0] * cellSize;
    const startOrdinate = points[startPoint][1] * cellSize;
    const endAbscissa = points[endPoint][0] * cellSize;
    const endOrdinate = points[endPoint][1] * cellSize;

    return (
        <path
            d={`M ${startAbscissa} ${startOrdinate} 
                L ${endAbscissa} ${endOrdinate}`}
            fill="none"
            stroke={theme.colours.bright}
            strokeWidth="2"
        />
    );
}

export default SegmentPath;
