import styled from "styled-components";

function Project() {
    return (
        <S_Content>
            <h1>Project page</h1>
        </S_Content>
    );
}

const S_Content = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.contrast};
    padding-left: 32px;
    padding-right: 32px;
`;

export default Project;
