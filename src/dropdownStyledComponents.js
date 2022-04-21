import styled from "styled-components";

const S_DropdownTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
`;

const S_Dropdown = styled.div`
    border-bottom: solid 1px;
    cursor: pointer;
    display: inline-block;
    margin: 0 5px;
    position: relative;
    width: 60px;
`;
const S_DropdownContent = styled.div`
    border-radius: 4px;
    display: ${(props) => (props.clicked ? "block" : "none")};
    left: -1px;
    max-height: 150px;
    min-width: 60px;
    overflow-y: auto;
    position: absolute;
    top: 32px;
    z-index: 1;

    & button {
        background-color: ${({ theme }) => theme.colours.backgroundLight};
        border-style: none;
        padding: 8px;
        text-align: left;
        text-decoration: none;
    }
`;

const S_DropdownButton = styled.button`
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.contrast};
    width: 100%;
    &:hover {
        background-color: ${({ theme }) => theme.colours.background};
    }
`;

export { S_DropdownButton, S_DropdownContent, S_Dropdown, S_DropdownTitle };
