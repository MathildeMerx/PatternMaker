import styled from "styled-components";

const Button = styled.button`
    background-color: ${({ theme }) => theme.colours.background};
    border: solid 1px;
    border-radius: 10%;
    color: ${({ theme }) => theme.colours.bright};
    padding: 6px 8px 4px;

    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.colours.backgroundLight};
        color: ${({ theme }) => theme.colours.contrast};
        cursor: pointer;
    }
`;

const S_CancelButton = styled(Button)`
    color: ${({ theme }) => theme.colours.negative};
    margin-right: 8px;
`;

const S_ValidateButton = styled(Button)`
    background-color: ${({ theme }) => theme.colours.bright};
    color: ${({ theme }) => theme.colours.background};
`;

export { Button, S_CancelButton, S_ValidateButton };
