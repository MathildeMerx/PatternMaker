import { useEffect, useRef, useState } from "react";
import { Grid } from "./Grid";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentLogic/SegmentsDisplay";
import { PointsDisplay } from "./PointsDisplay";
import { CurvesDisplay } from "./CurveLogic/CurvesDisplay";
import styled from "styled-components";
import { pointNames } from "./alphabet";
import { PrintDropdown } from "./PrintDropdown";
import { PrintGrid } from "./PrintGrid";
import { Logout } from "@mui/icons-material";
import { PatternNameForm } from "./PatternNameForm";
import { LogIn } from "./LogIn";
import { SaveIcon } from "./SaveIcon";
import { RetrieveIcon } from "./RetrieveIcon";
import { NumCellsInput } from "./NumCellsInput";

function App() {
    //Custom hook to determine the space available for the grid
    let [{ width, height }, containerRef] = useContainerDimensions();

    //The user will be able to choose the number of visible columns and rows
    //in the grid with this state
    const [numColumns, setNumColumns] = useState(10);
    const [numRows, setNumRows] = useState(10);

    //Determining the size of the cell based on their number and the space available
    const cellWidth = Math.floor((width - GRID_MARGIN * 2) / numColumns);
    const cellHeight = Math.floor(
        (height - (PATTERN_TITLE_MARGIN * 2 + PATTERN_TITLE_HEIGHT)) / numRows
    );

    //These states will contain the points, segments and curves necessary to draw
    //the pattern
    const [points, setPoints] = useState({});
    const [segments, setSegments] = useState([]);
    const [curves, setCurves] = useState({});

    //A list of available point names
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);

    //When a user makes a construction error, this state will contain
    //the error message
    const [alertMessage, setAlertMessage] = useState(false);

    //This useEffect erases said error message after 5 sec
    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlertMessage(false);
        }, 5000);

        return () => clearTimeout(alertTimer);
    }, [setAlertMessage, alertMessage]);

    //These states let the user choose the name of the pattern
    const [pieceName, setPieceName] = useState("Piece of pattern name");
    const [editingName, setEditingName] = useState(false);

    //This is the ref of grid to be printed (if desired)
    let printRef = useRef();

    //This state lets the user specify the size of a cell when printing
    const [cellSize, setCellSize] = useState(1);

    //This state reflects whether the print menu should be open or not
    const [clicked, setClicked] = useState(false);

    //This state contains the username and password of the user, while waiting
    //for another better method
    const [credentials, setCredentials] = useState(false);

    return (
        <S_Content>
            <S_Header>
                <S_Title>Pattern designer</S_Title>
                <S_Commands>
                    {/* If the user is connected, we want to see a log out, save and retrieve icons. Else, only a log in icon. */}
                    {credentials ? (
                        <>
                            <div>
                                <S_Logout
                                    onClick={() => setCredentials(false)}
                                />
                                Log out
                            </div>
                            <SaveIcon
                                points={points}
                                segments={segments}
                                curves={curves}
                                pieceName={pieceName}
                                credentials={credentials}
                            />
                            <RetrieveIcon
                                setPoints={setPoints}
                                setSegments={setSegments}
                                setCurves={setCurves}
                                setPossiblePointNames={setPossiblePointNames}
                                setPieceName={setPieceName}
                                credentials={credentials}
                            />
                        </>
                    ) : (
                        <LogIn setCredentials={setCredentials} />
                    )}
                    {/* The print icon is shown whether logged in or not */}
                    <div>
                        <PrintDropdown
                            cellSize={cellSize}
                            setCellSize={setCellSize}
                            printRef={printRef}
                            clicked={clicked}
                            setClicked={setClicked}
                        ></PrintDropdown>
                        <p>Print</p>
                    </div>
                </S_Commands>
            </S_Header>

            <S_GridDisplay>
                {/* Displaying aside the points, segments and curves 
            already created by the user */}
                <S_Aside height={height}>
                    <div>
                        <PointsDisplay points={points} />
                        <SegmentsDisplay
                            points={points}
                            segments={segments}
                            setSegments={setSegments}
                            alertMessage={alertMessage}
                            setAlertMessage={setAlertMessage}
                        />
                        <CurvesDisplay
                            points={points}
                            curves={curves}
                            setCurves={setCurves}
                            cellHeight={cellHeight}
                            cellWidth={cellWidth}
                            alertMessage={alertMessage}
                            setAlertMessage={setAlertMessage}
                        />
                    </div>
                    <NumCellsInput
                        numColumns={numColumns}
                        setNumColumns={setNumColumns}
                        numRows={numRows}
                        setNumRows={setNumRows}
                    />
                </S_Aside>
                <S_DesignContent ref={containerRef}>
                    {/* Form to modify the pattern name */}
                    <PatternNameForm
                        editingName={editingName}
                        setEditingName={setEditingName}
                        pieceName={pieceName}
                        setPieceName={setPieceName}
                        PATTERN_TITLE_HEIGHT={PATTERN_TITLE_HEIGHT}
                        PATTERN_TITLE_MARGIN={PATTERN_TITLE_MARGIN}
                    />

                    {/* Grid in which the user can design their pattern, and see it */}
                    <S_DrawGrid>
                        <Grid
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
                    </S_DrawGrid>
                </S_DesignContent>
            </S_GridDisplay>

            {/* A non interactive grid, real-sized, printable */}
            <S_PrintGrid clicked={clicked} ref={printRef}>
                <PrintGrid
                    points={points}
                    segments={segments}
                    curves={curves}
                    numColumns={numColumns}
                    numRows={numRows}
                    cellSize={cellSize}
                />
            </S_PrintGrid>
        </S_Content>
    );
}

const TITLE_MARGIN = 32;
const TITLE_HEIGHT = 2;

const PATTERN_TITLE_MARGIN = 24;
const PATTERN_TITLE_HEIGHT = 32;

const GRID_MARGIN = 32;

const S_Aside = styled.aside`
    display: flex;
    flex-direction: column;
    height: ${(props) => props.height - 16}px;
    justify-content: space-between;
`;

const S_Commands = styled.div`
    align-items: baseline;
    color: ${({ theme }) => theme.colours.bright};
    gap: 20px;
    justify-content: flex-end;
    display: flex;
    min-width: 120px;

    & div svg {
        display: block;
        margin: auto;
    }

    & div p {
        margin: 0;
    }
`;

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

const S_DesignContent = styled.section`
    height: calc(100% - ${TITLE_MARGIN * 2 + TITLE_HEIGHT * 16}px);
    width: calc(100% - ${GRID_MARGIN}px);
`;

const S_DrawGrid = styled.div`
    line-height: 0%;
`;

const S_GridDisplay = styled.div`
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: 1fr 3fr;
    height: 100%;
`;

const S_Header = styled.header`
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-left: -32px;
    padding-left: 32px;
    padding-right: 64px;
`;

const S_Logout = styled(Logout)`
    cursor: pointer;
`;

const S_PrintGrid = styled.div`
    display: ${(props) => (props.clicked ? "block" : "none")};
`;

const S_Title = styled.h1`
    line-height: ${TITLE_HEIGHT}rem;
    margin: ${TITLE_MARGIN}px 0;
`;

export default App;
