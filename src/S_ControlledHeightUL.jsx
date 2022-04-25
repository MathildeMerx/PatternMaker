import styled from "styled-components";

const S_ControlledHeightUL = styled.ul`
    max-height: 150px;
    overflow-y: auto;

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
