import { useEffect, useRef, useState } from "react";
import { Grid } from "./Grid";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentsDisplay";
import { PointsDisplay } from "./PointsDisplay";
import { CurvesDisplay } from "./CurvesDisplay";
import { EditIcon } from "@chakra-ui/icons";
import styled from "styled-components";
import { retrieve } from "./retrieve";
import { save } from "./save";
import { pointNames } from "./alphabet";
import ReactToPrint from "react-to-print";

function App() {
    let gridRef = useRef();
    let [{ width, height }, containerRef] = useContainerDimensions();

    const [numColumns, setNumColumns] = useState(10);
    const [numRows, setNumRows] = useState(10);
    const [rowHeight, setRowHeight] = useState(1);
    const [colWidth, setColWidth] = useState(1);

    const cellWidth = Math.floor((width - GRID_MARGIN * 2) / numColumns);

    const cellHeight = Math.floor(
        (height - (PATTERN_TITLE_MARGIN * 2 + PATTERN_TITLE_HEIGHT)) / numRows
    );

    const numButton = (numColumns - 1) * (numRows - 1);

    const [points, setPoints] = useState({});
    const [segments, setSegments] = useState([]);
    const [curves, setCurves] = useState({});
    const [possiblePointNames, setPossiblePointNames] = useState(pointNames);

    const [alertMessage, setAlertMessage] = useState(false);

    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlertMessage(false);
        }, 5000);

        return () => clearTimeout(alertTimer);
    }, [setAlertMessage, alertMessage]);

    const [pieceName, setPieceName] = useState("Piece of pattern name");
    const [editingName, setEditingName] = useState(false);

    return (
        <S_Content>
            <S_Header>
                <S_Title>Pattern designer</S_Title>
                <S_Commands>
                    <button onClick={() => save(points, segments, curves)}>
                        Save
                    </button>
                    <button
                        onClick={() =>
                            retrieve(
                                points,
                                setPoints,
                                setSegments,
                                setCurves,
                                setPossiblePointNames
                            )
                        }
                    >
                        Retrieve
                    </button>
                    <ReactToPrint
                        trigger={() => <button>{`Print`}</button>}
                        content={() => gridRef}
                    />
                </S_Commands>
            </S_Header>
            <S_GridDisplay>
                <aside>
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
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={numColumns}
                        onChange={(e) =>
                            setNumColumns(parseInt(e.target.value))
                        }
                    />
                    Number of columns: {numColumns}
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={numRows}
                        onChange={(e) => setNumRows(parseInt(e.target.value))}
                    />
                    Number of rows: {numRows}
                    <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.05"
                        value={colWidth}
                        onChange={(e) => setColWidth(e.target.value)}
                    />
                    Column width: {colWidth}
                    <input
                        type="range"
                        min="0.2"
                        max="2.5"
                        step="0.05"
                        value={rowHeight}
                        onChange={(e) => setRowHeight(e.target.value)}
                    />
                    Row height: {rowHeight}
                </aside>
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
                            <input type="submit" />
                        </form>
                    ) : (
                        <S_PatternName>
                            {pieceName}
                            <S_EditIcon>
                                <EditIcon
                                    onClick={() => setEditingName(true)}
                                />
                            </S_EditIcon>
                        </S_PatternName>
                    )}
                    <S_PrintGrid ref={(reference) => (gridRef = reference)}>
                        <Grid
                            numColumns={numColumns}
                            numRows={numRows}
                            numButton={numButton}
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
                    </S_PrintGrid>
                </S_DesignContent>
            </S_GridDisplay>
        </S_Content>
    );
}

const TITLE_MARGIN = 32;
const TITLE_HEIGHT = 2;

const PATTERN_TITLE_MARGIN = 24;
const PATTERN_TITLE_HEIGHT = 32;

const GRID_MARGIN = 32;

const S_Commands = styled.div``;

const S_Content = styled.div`
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

const S_EditIcon = styled.span`
    cursor: pointer;
    margin-left: 10px;
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
    padding-right: 64px;
`;

const S_PatternName = styled.h2`
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: ${PATTERN_TITLE_MARGIN}px auto;
    text-align: center;
`;

const S_PatternNameModify = styled.input`
    border: 3px solid;
    border-radius: 5px;
    font-size: 1.5rem;
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: ${PATTERN_TITLE_MARGIN - 4}px auto;
    text-align: center;
`;

const S_PrintGrid = styled.div`
    line-height: 0%;
`;

// Overall height of Title: 72px (32px for the text, + 2x20px of margin)
const S_Title = styled.h1`
    line-height: ${TITLE_HEIGHT}rem;
    margin: ${TITLE_MARGIN}px 0;
`;

export default App;
