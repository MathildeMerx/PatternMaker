import { useTheme } from "styled-components";

function NoPointText({ gridSize }) {
    //This theme will be used for the colors of the SVG points
    const theme = useTheme();
    return (
        <text
            x={`${gridSize / 20}`}
            y={`${gridSize / 3}`}
            textLength={`${gridSize * 0.9}`}
            fontSize={`${gridSize / 20}`}
            fill={theme.colours.bright}
        >
            Click on this grid to create a point!
        </text>
    );
}

export default NoPointText;
