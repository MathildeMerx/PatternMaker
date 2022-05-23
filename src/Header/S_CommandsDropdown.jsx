import styled from "styled-components";

//A styled component for dropdown menus in the menu bar
const S_CommandsDropdown = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    border: solid 1px;
    color: ${({ theme }) => theme.colours.contrast};
    display: ${(props) => (props.menuOpen ? "flex" : "none")};
    flex-direction: column;
    padding: 8px;
    position: absolute;
    right: 0;
    top: 24px;
    width: 175px;
    z-index: 1;
`;

export default S_CommandsDropdown;
