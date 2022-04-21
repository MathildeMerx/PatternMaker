import { useTheme } from "styled-components";

function SegmentPath({ segment, points, cellWidth, cellHeight }) {
    const theme = useTheme();
    const startPoint = segment[0];
    const endPoint = segment[1];

    const startAbscissa = points[startPoint][0] * cellWidth;
    const startOrdinate = points[startPoint][1] * cellHeight;
    const endAbscissa = points[endPoint][0] * cellWidth;
    const endOrdinate = points[endPoint][1] * cellHeight;

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

export { SegmentPath };
