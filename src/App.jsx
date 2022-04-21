import { useEffect, useRef, useState } from "react";
import { Grid } from "./Grid";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentsDisplay";
import { PointsDisplay } from "./PointsDisplay";
import { CurvesDisplay } from "./CurvesDisplay";
import styled from "styled-components";
import { retrieve } from "./retrieve";
import { save } from "./save";
import { pointNames } from "./alphabet";
import { PrintDropdown } from "./PrintDropdown";
import { PrintGrid } from "./PrintGrid";
import { Edit, SaveOutlined, FileDownload } from "@mui/icons-material";
import { Button } from "./Theme/Button";

function App() {
    //Custom hook to determine the space available for the grid
    let [{ width, height }, containerRef] = useContainerDimensions();

    //The user will be able to choose the number of columns and rows
    //with this state
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

    //When a user makes an error, this will contain the error message
    const [alertMessage, setAlertMessage] = useState(false);

    //This erases the error message after 5 sec
    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlertMessage(false);
        }, 5000);

        return () => clearTimeout(alertTimer);
    }, [setAlertMessage, alertMessage]);

    //To let the user choose the name of the pattern
    const [pieceName, setPieceName] = useState("Piece of pattern name");
    const [editingName, setEditingName] = useState(false);

    //Ref of the printing grid
    let printRef = useRef();

    //For the user to specify the real-life size of a cell
    const [rowHeight, setRowHeight] = useState(1);
    const [colWidth, setColWidth] = useState(1);

    const [clicked, setClicked] = useState(false);

    return (
        <S_Content>
            <S_Header>
                <S_Title>Pattern designer</S_Title>
                <S_Commands>
                    <div>
                        <S_SaveOutlined
                            onClick={() =>
                                save(points, segments, curves, pieceName)
                            }
                        />
                        <p>Save</p>
                    </div>
                    <div>
                        <S_FileDownload
                            onClick={() =>
                                retrieve(
                                    setPoints,
                                    setSegments,
                                    setCurves,
                                    setPossiblePointNames,
                                    setPieceName
                                )
                            }
                        />
                        <p>Retrieve</p>
                    </div>
                    <div>
                        <PrintDropdown
                            rowHeight={rowHeight}
                            setRowHeight={setRowHeight}
                            colWidth={colWidth}
                            setColWidth={setColWidth}
                            printRef={printRef}
                            clicked={clicked}
                            setClicked={setClicked}
                        ></PrintDropdown>
                        <p>Print</p>
                    </div>
                </S_Commands>
            </S_Header>
            <S_GridDisplay>
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
                    <div>
                        <S_Input
                            type="range"
                            min="10"
                            max="50"
                            value={numColumns}
                            onChange={(e) =>
                                setNumColumns(parseInt(e.target.value))
                            }
                        />
                        Number of columns: {numColumns}
                        <S_Input
                            type="range"
                            min="10"
                            max="50"
                            value={numRows}
                            onChange={(e) =>
                                setNumRows(parseInt(e.target.value))
                            }
                        />
                        Number of rows: {numRows}
                    </div>
                </S_Aside>
                <S_DesignContent ref={containerRef}>
                    {editingName ? (
                        <form
                            onSubmit={() => setEditingName(false)}
                            style={{ textAlign: "center" }}
                        >
                            <label htmlFor="Title-piece-of-pattern">
                                <S_PatternNameModify
                                    id="Title-piece-of-pattern"
                                    type="text"
                                    value={pieceName}
                                    onChange={(event) =>
                                        setPieceName(event.target.value)
                                    }
                                ></S_PatternNameModify>
                            </label>
                            <Button type="submit">Submit</Button>
                        </form>
                    ) : (
                        <S_PatternName>
                            {pieceName}
                            <S_EditIcon>
                                <Edit onClick={() => setEditingName(true)} />
                            </S_EditIcon>
                        </S_PatternName>
                    )}
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

            <S_PrintGrid clicked={clicked} ref={printRef}>
                <PrintGrid
                    points={points}
                    segments={segments}
                    curves={curves}
                    numColumns={numColumns}
                    numRows={numRows}
                    colWidth={colWidth}
                    rowHeight={rowHeight}
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
    justify-content: space-between;
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

const S_EditIcon = styled.span`
    cursor: pointer;
    margin-left: 10px;

    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;

const S_FileDownload = styled(FileDownload)`
    cursor: pointer;
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
const S_Input = styled.input`
    display: block;
    -webkit-appearance: none;
    width: 50%;
    min-width: 150px;
    height: 10px;
    margin: 10px 0;
    border-radius: 6px;
    outline: 0;
    background: ${({ theme }) => theme.colours.backgroundLight};

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 18px;
        width: 18px;
        border-radius: 3px;
        background: ${({ theme }) => theme.colours.bright};
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }

    &::-moz-range-thumb {
        height: 18px;
        width: 18px;
        border-radius: 3px;
        background: ${({ theme }) => theme.colours.bright};
        border: 0;
        border-radius: 50%;
        cursor: pointer;
    }

    &::-ms-thumb {
        height: 18px;
        width: 18px;
        border-radius: 3px;
        background: ${({ theme }) => theme.colours.bright};
        border-radius: 50%;
        border: 0;
        cursor: pointer;
    }
`;

const S_PatternName = styled.h2`
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: ${PATTERN_TITLE_MARGIN}px auto;
    text-align: center;
`;

const S_PatternNameModify = styled.input`
    background-color: ${({ theme }) => theme.colours.background};
    border: none;
    border-bottom: 3px solid;
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 1.5rem;
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: ${PATTERN_TITLE_MARGIN - 4}px auto;
    margin-right: 8px;
    text-align: center;

    &:focus-visible {
        outline: none;
    }
`;

const S_PrintGrid = styled.div`
    display: ${(props) => (props.clicked ? "block" : "none")};
`;

const S_SaveOutlined = styled(SaveOutlined)`
    cursor: pointer;
`;

const S_Title = styled.h1`
    line-height: ${TITLE_HEIGHT}rem;
    margin: ${TITLE_MARGIN}px 0;
`;

export default App;
export { S_Input };
