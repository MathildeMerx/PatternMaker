import { useEffect, useRef, useState, useLayoutEffect } from "react";
import useContainerDimensions from "./useContainerDimensions";
import styled from "styled-components";
import pointNames from "./alphabet";
import PrintGrid from "./Print/PrintGrid";
import Header from "./Header/Header";
import {
    PATTERN_TITLE_MARGIN,
    PATTERN_TITLE_HEIGHT,
    GRID_MARGIN,
} from "../Theme/constants";
import Aside from "./Aside";
import DesignContent from "./DesignContent";
import useLocalStorage from "./useLocalStorage";

const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

function DesignerWorking() {
    //  Custom hook to determine the space available for the grid
    let [{ width, height }, containerRef] = useContainerDimensions();

    // The user will be able to choose the number of visible columns and rows
    // in the grid with this state
    const [numCells, setNumCells] = useLocalStorage("numCells", 10);
    const [verticalGridPosition, setVerticalGridPosition] = useLocalStorage(
        "verticalGridPosition",
        0
    );
    const [horizontalGridPosition, setHorizontalGridPosition] = useLocalStorage(
        "horizontalGridPosition",
        0
    );

    // Determining the size of the cell based on their number and the space available

    // `cellWidth` is the space horizontally available for the grid
    // (the width of its parent minus its margin) divided by the number of columns
    const cellSize = Math.min(
        Math.floor((width - GRID_MARGIN * 2) / numCells),
        Math.floor(
            (height - (PATTERN_TITLE_MARGIN + PATTERN_TITLE_HEIGHT + 8)) /
                numCells
        )
    );

    // These states will contain the points, segments and curves necessary to draw
    // the pattern
    const [points, setPoints] = useLocalStorage("points", {});
    const [segments, setSegments] = useLocalStorage("segments", []);
    const [curves, setCurves] = useLocalStorage("curves", {});

    // When a user makes a construction error, this state will contain
    // the error message
    const [alertMessage, setAlertMessage] = useState({ alertType: "" });

    // This useEffect erases said error message after 5 sec
    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlertMessage({ alertType: "" });
        }, 5000);

        return () => clearTimeout(alertTimer);
    }, [alertMessage]);

    // These states let the user choose the name of the pattern

    const [pieceName, setPieceName] = useLocalStorage(
        "pieceName",
        "Piece of pattern name"
    );
    // This is the ref of grid to be printed (if desired)
    let printRef = useRef();

    // This state lets the user specify the size of a cell when printing
    const [cellSizePrinting, setCellSizePrinting] = useState(1);

    // This state reflects whether the print menu should be open or not
    const [printMenuOpen, setPrintMenuOpen] = useState(false);

    // This state contains the username and password of the user, while waiting
    // for another better method
    const [credentials, setCredentials] = useLocalStorage("credentials", {
        username: "",
        password: "",
        loggedIn: false,
    });

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
                setPieceName={setPieceName}
                cellSizePrinting={cellSizePrinting}
                setCellSizePrinting={setCellSizePrinting}
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
                    cellSize={cellSize}
                    numCells={numCells}
                    setNumCells={setNumCells}
                    setHorizontalGridPosition={setHorizontalGridPosition}
                    setVerticalGridPosition={setVerticalGridPosition}
                />

                <DesignContent
                    containerRef={containerRef}
                    pieceName={pieceName}
                    setPieceName={setPieceName}
                    numCells={numCells}
                    points={points}
                    setPoints={setPoints}
                    cellSize={cellSize}
                    segments={segments}
                    curves={curves}
                    setCurves={setCurves}
                    setAlertMessage={setAlertMessage}
                    verticalGridPosition={verticalGridPosition}
                    horizontalGridPosition={horizontalGridPosition}
                />
            </S_GridDisplay>

            {/* A non interactive grid, real-sized, printable */}
            <S_PrintGridContainer printMenuOpen={printMenuOpen} ref={printRef}>
                <PrintGrid
                    points={points}
                    segments={segments}
                    curves={curves}
                    cellSizePrinting={cellSizePrinting}
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

export default DesignerWorking;
