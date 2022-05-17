import styled from "styled-components";

//A styled component to contain the height of the display components
//(to display the points, segments and curves)
const S_ControlledHeightUL = styled.ul`
    /* 350px is a rough estimate of the space taken by titles and the range inputs */
    margin: 0;
    max-height: ${({ height }) => (height - 350) / 3}px;
    overflow-y: auto;

    /* We're giving the scrollbar the style of this project */
    &::-webkit-scrollbar {
        background-color: ${({ theme }) => theme.colours.background};
        border: solid 1px ${({ theme }) => theme.colours.backgroundLight};
        border-radius: 5px;
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colours.backgroundLight};
        border-radius: 5px;

        :hover {
            border: dashed 1px ${({ theme }) => theme.colours.bright};
        }
    }
`;

export { S_ControlledHeightUL };
