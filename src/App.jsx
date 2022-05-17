import { useEffect, useRef, useState } from "react";
import { useContainerDimensions } from "./useContainerDimensions";
import styled from "styled-components";
import { pointNames } from "./alphabet";
import { PrintGrid } from "./PrintGrid";
import Header from "./Header/Header";
import {
    PATTERN_TITLE_MARGIN,
    PATTERN_TITLE_HEIGHT,
    GRID_MARGIN,
} from "./Theme/constants";
import Aside from "./Aside";
import DesignContent from "./DesignContent";

function App() {
    //  Custom hook to determine the space available for the grid
    let [{ width, height }, containerRef] = useContainerDimensions();

    // The user will be able to choose the number of visible columns and rows
    // in the grid with this state
    const [numColumns, setNumColumns] = useState(10);
    const [numRows, setNumRows] = useState(10);

    // Determining the size of the cell based on their number and the space available

    // `cellWidth` is the space horizontally available for the grid
    // (the width of its parent minus its margin) divided by the number of columns
    const cellWidth = Math.floor((width - GRID_MARGIN * 2) / numColumns);
    // `cellHeight` is the space vertically availablefor the grid
    // (the height of its parent minus its margin and the height of the title)
    // divided by the number of rows
    const cellHeight = Math.floor(
        (height - (PATTERN_TITLE_MARGIN * 2 + PATTERN_TITLE_HEIGHT)) / numRows
    );

    // These states will contain the points, segments and curves necessary to draw
    // the pattern
    const [points, setPoints] = useState({});
    const [segments, setSegments] = useState([]);
    const [curves, setCurves] = useState({});

    // A list of available point names
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);

    // When a user makes a construction error, this state will contain
    // the error message
    const [alertMessage, setAlertMessage] = useState(null);

    // This useEffect erases said error message after 5 sec
    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlertMessage(null);
        }, 5000);

        return () => clearTimeout(alertTimer);
    }, [alertMessage]);

    // These states let the user choose the name of the pattern
    const [pieceName, setPieceName] = useState("Piece of pattern name");

    // This is the ref of grid to be printed (if desired)
    let printRef = useRef();

    // This state lets the user specify the size of a cell when printing
    const [cellSize, setCellSize] = useState(1);

    // This state reflects whether the print menu should be open or not
    const [printMenuOpen, setPrintMenuOpen] = useState(false);

    // This state contains the username and password of the user, while waiting
    // for another better method
    const [credentials, setCredentials] = useState(false);

    return (
        <S_Content>
            {/*Header with the title of the project, and the command icons */}
            <Header
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
                cellSize={cellSize}
                setCellSize={setCellSize}
                printRef={printRef}
                printMenuOpen={printMenuOpen}
                setPrintMenuOpen={setPrintMenuOpen}
            />

            <S_GridDisplay>
                {/* Displaying aside the points, segments and curves 
            already created by the user */}
                <Aside
                    height={height}
                    points={points}
                    segments={segments}
                    setSegments={setSegments}
                    alertMessage={alertMessage}
                    setAlertMessage={setAlertMessage}
                    curves={curves}
                    setCurves={setCurves}
                    cellHeight={cellHeight}
                    cellWidth={cellWidth}
                    numColumns={numColumns}
                    setNumColumns={setNumColumns}
                    numRows={numRows}
                    setNumRows={setNumRows}
                />

                <DesignContent
                    containerRef={containerRef}
                    pieceName={pieceName}
                    setPieceName={setPieceName}
                    numColumns={numColumns}
                    numRows={numRows}
                    points={points}
                    setPoints={setPoints}
                    cellHeight={cellHeight}
                    cellWidth={cellWidth}
                    possiblePointNames={possiblePointNames}
                    setPossiblePointNames={setPossiblePointNames}
                    segments={segments}
                    curves={curves}
                    setCurves={setCurves}
                    setAlertMessage={setAlertMessage}
                />
            </S_GridDisplay>

            {/* A non interactive grid, real-sized, printable */}
            <S_PrintGridContainer printMenuOpen={printMenuOpen} ref={printRef}>
                <PrintGrid
                    points={points}
                    segments={segments}
                    curves={curves}
                    numColumns={numColumns}
                    numRows={numRows}
                    cellSize={cellSize}
                />
            </S_PrintGridContainer>
        </S_Content>
    );
}

const S_Content = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.contrast};
    height: 100vh;
    left: 0;
    padding-left: 32px;
    padding-right: 32px;
    position: fixed;
    top: 0;
    width: 100vw;
`;

const S_GridDisplay = styled.div`
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: 1fr 3fr;
    height: 100%;
`;

const S_PrintGridContainer = styled.div`
    display: ${(props) => (props.printMenuOpen ? "block" : "none")};
`;

export default App;
