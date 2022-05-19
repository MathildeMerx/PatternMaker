import styled from "styled-components";

//A styled component for alert messages
const S_AlertMessage = styled.p`
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.bright};
    font-size: 0.8rem;
`;

export default S_AlertMessage;
