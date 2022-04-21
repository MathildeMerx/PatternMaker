import styled from "styled-components";

const S_HoverInfoIcon = styled.span`
    margin-left: 10px;
    position: relative;

    &:hover div {
        background-color: ${({ theme }) => theme.colours.background};
        border: solid 2px;
        bottom: 20px;
        display: block;
        font-size: 0.6em;
        font-weight: 400;
        padding: 4px;
        position: absolute;
        left: 20px;
        width: 200px;
    }

    div {
        display: none;
    }
`;

export { S_HoverInfoIcon };
