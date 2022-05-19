import { useTheme } from "styled-components";

function NoPointText({ width, height }) {
    //This theme will be used for the colors of the SVG points
    const theme = useTheme();
    return (
        <text
            x={`${width / 20}`}
            y={`${height / 3}`}
            textLength={`${width * 0.9}`}
            fontSize={`${width / 20}`}
            fill={theme.colours.bright}
        >
            Click on this grid to create a point!
        </text>
    );
}

export default NoPointText;
