import styled from "styled-components";
import { MIN_WNDOW_HEIGHT, MIN_WNDOW_WIDTH } from "./Theme/constants";

function AppNotWorking({ width, height }) {
    return (
        <S_NoAppContent>
            <S_NotWorkingTitle>
                Sorry, your window is too small. Try resizing it to use the app!
            </S_NotWorkingTitle>
            {width < MIN_WNDOW_WIDTH ? (
                <S_NotWorkingSubtitle>
                    {`Minimum width: ${MIN_WNDOW_WIDTH} - your width: ${width}.`}
                </S_NotWorkingSubtitle>
            ) : null}
            {height < MIN_WNDOW_HEIGHT ? (
                <S_NotWorkingSubtitle>
                    {`Minimum height: ${MIN_WNDOW_HEIGHT} - your height: ${height}.`}
                </S_NotWorkingSubtitle>
            ) : null}
        </S_NoAppContent>
    );
}

const S_NoAppContent = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    height: 100vh;
    position: fixed;
    width: 100%;
`;

const S_NotWorkingTitle = styled.h1`
    color: ${({ theme }) => theme.colours.bright};
    padding-left: 32px;
`;

const S_NotWorkingSubtitle = styled.h2`
    color: ${({ theme }) => theme.colours.contrast};
    padding-left: 32px;
`;

export default AppNotWorking;
