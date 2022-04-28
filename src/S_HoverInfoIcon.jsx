import styled from "styled-components";

const S_HoverInfoIcon = styled.span`
    margin-left: 10px;
    position: relative;
    top: 4px;

    &:hover div {
        background-color: ${({ theme }) => theme.colours.background};
        border: solid 2px;
        bottom: 20px;
        display: block;
        font-weight: 400;
        padding: 4px;
        position: absolute;
        left: 20px;
        width: 200px;
    }

    h2 &:hover div {
        font-size: 1rem;
    }

    div {
        display: none;
    }
`;

export { S_HoverInfoIcon };
