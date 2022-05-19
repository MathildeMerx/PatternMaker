import styled from "styled-components";
import { InfoOutlined } from "@mui/icons-material";

function HoverInfo({ children }) {
    return (
        <S_HoverInfoIcon>
            <InfoOutlined />
            <div>{children}</div>
        </S_HoverInfoIcon>
    );
}

//Styled components of info icons, which when hovered display the text of their child
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
        z-index: 1;
    }

    h2 &:hover div {
        font-size: 1rem;
    }

    div {
        display: none;
    }
`;

export default HoverInfo;
