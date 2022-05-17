import styled from "styled-components";

//In this file are different styled elements to make a dropdown menu

//That's the parent element of the whole dropdown
const S_Dropdown = styled.div`
    border-bottom: solid 1px;
    cursor: pointer;
    display: inline-block;
    margin: 0 5px;
    position: relative;
    width: 60px;
`;

//Each element of the dropdown menu is a clickable button
const S_DropdownButton = styled.button`
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.contrast};
    width: 100%;
    &:hover {
        background-color: ${({ theme }) => theme.colours.background};
    }
`;

//All the clickable buttons are contained in this
const S_DropdownContent = styled.div`
    background-color: ${({ theme }) => theme.colours.backgroundLight};
    border: solid 1px ${({ theme }) => theme.colours.backgroundLight};
    border-radius: 4px;
    display: ${(props) => (props.clicked ? "block" : "none")};
    left: -1px;
    max-height: 125px;
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

    //A scrollbar to the colors of this project
    &::-webkit-scrollbar {
        background-color: ${({ theme }) => theme.colours.background};
        border: double 2px ${({ theme }) => theme.colours.background};
        border-radius: 5px;
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${({ theme }) => theme.colours.backgroundLight};
        border: solid 2px ${({ theme }) => theme.colours.background};
        border-radius: 5px;
    }
`;

//The visible part of the dropdown when it's not dropped
const S_DropdownTitle = styled.div`
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
`;

export { S_DropdownButton, S_DropdownContent, S_Dropdown, S_DropdownTitle };
