import styled from "styled-components";

const S_DropdownTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
`;

const S_Dropdown = styled.div`
    border: solid 1px;
    display: inline-block;
    margin: 0 5px;
    position: relative;
    width: 60px;
`;
const S_DropdownContent = styled.div`
    border-color: black;
    border: solid 1px;
    display: none;
    left: -1px;
    max-height: 150px;
    min-width: 60px;
    overflow-y: auto;
    position: absolute;
    top: 20px;

    & button {
        border-style: none;
        display: block;
        padding: 4px;
        text-align: left;
        text-decoration: none;
        width: 100%;
    }

    ${S_Dropdown}:hover & {
        display: block;
    }
`;

const S_DropdownButton = styled.button`
    &:hover {
        background-color: wheat;
    }
`;

export { S_DropdownButton, S_DropdownContent, S_Dropdown, S_DropdownTitle };
