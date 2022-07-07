import Commands from "./Commands";
import styled from "styled-components";
import { TITLE_MARGIN, TITLE_HEIGHT } from "../../Theme/constants";

function Header({
    credentials,
    setCredentials,
    points,
    segments,
    curves,
    pieceName,
    setPoints,
    setSegments,
    setCurves,
    setPossiblePointNames,
    setPieceName,
    cellSizePrinting,
    setCellSizePrinting,
    printRef,
    printMenuOpen,
    setPrintMenuOpen,
}) {
    return (
        <S_Header>
            <S_Title>Pattern designer</S_Title>
            <Commands
                credentials={credentials}
                setCredentials={setCredentials}
                points={points}
                segments={segments}
                curves={curves}
                pieceName={pieceName}
                setPoints={setPoints}
                setSegments={setSegments}
                setCurves={setCurves}
                setPossiblePointNames={setPossiblePointNames}
                setPieceName={setPieceName}
                cellSizePrinting={cellSizePrinting}
                setCellSizePrinting={setCellSizePrinting}
                printRef={printRef}
                printMenuOpen={printMenuOpen}
                setPrintMenuOpen={setPrintMenuOpen}
            />
        </S_Header>
    );
}

const S_Header = styled.header`
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-right: 64px;
`;

const S_Title = styled.h1`
    line-height: ${TITLE_HEIGHT}rem;
    margin: ${TITLE_MARGIN}px 0;
`;

export default Header;
