import { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentsDisplay";
import { PointsDisplay } from "./PointsDisplay";
import { CurvesDisplay } from "./CurvesDisplay";
import styled from "styled-components";

function App() {
    let [{ width, height }, containerRef] = useContainerDimensions();

    const [numColumns, setNumColumns] = useState(10);
    const [numRows, setNumRows] = useState(10);

    const cellWidth = Math.floor((width - GRID_MARGIN) / numColumns);

    const cellHeight = Math.floor(
        (height - (PATTERN_TITLE_MARGIN * 2 + PATTERN_TITLE_HEIGHT)) / numRows
    );

    const numButton = (numColumns - 1) * (numRows - 1);

    const [existingPoints, setExistingPoints] = useState({});
    const [testExistingPoints, setTestExistingPoints] = useState({});
    const [segments, setSegments] = useState([]);
    const [curves, setCurves] = useState({});

    const [alertDeletePoint, setAlertDeletePoint] = useState(false);

    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setAlertDeletePoint(false);
        }, 5000);

        return () => clearTimeout(alertTimer);
    }, [setAlertDeletePoint, alertDeletePoint]);

    return (
        <S_Content>
            <header>
                <S_Title>Pattern designer</S_Title>
            </header>
            <S_GridDisplay>
                <aside>
                    <PointsDisplay existingPoints={existingPoints} />
                    <SegmentsDisplay
                        existingPoints={existingPoints}
                        segments={segments}
                        setSegments={setSegments}
                        alertDeletePoint={alertDeletePoint}
                    />
                    <CurvesDisplay
                        existingPoints={existingPoints}
                        curves={curves}
                        setCurves={setCurves}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                        alertDeletePoint={alertDeletePoint}
                    />
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={numColumns}
                        onChange={(e) =>
                            setNumColumns(parseInt(e.target.value))
                        }
                        className="slider"
                        id="borderRadius"
                    />
                    Number of columns: {numColumns}
                    <input
                        type="range"
                        min="10"
                        max="50"
                        value={numRows}
                        onChange={(e) => setNumRows(parseInt(e.target.value))}
                        className="slider"
                        id="borderRadius"
                    />
                    Number of rows: {numRows}
                </aside>
                <S_DesignContent ref={containerRef}>
                    <S_PatternName>GRID</S_PatternName>
                    <Grid
                        numColumns={numColumns}
                        numRows={numRows}
                        numButton={numButton}
                        existingPoints={existingPoints}
                        setExistingPoints={setExistingPoints}
                        cellHeight={cellHeight}
                        cellWidth={cellWidth}
                        segments={segments}
                        curves={curves}
                        setCurves={setCurves}
                        setAlertDeletePoint={setAlertDeletePoint}
                    />
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

const S_Content = styled.div`
    height: 100vh;
    left: 0;
    padding-left: 32px;
    position: fixed;
    top: 0;
    width: 100vw;
`;

const S_DesignContent = styled.section`
    height: calc(100% - ${TITLE_MARGIN * 2 + TITLE_HEIGHT * 16}px);
    width: calc(100% - ${GRID_MARGIN}px);
`;

const S_GridDisplay = styled.div`
    display: grid;
    grid-column-gap: 32px;
    grid-template-columns: 1fr 3fr;
    height: 100%;
`;

const S_PatternName = styled.h2`
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: ${PATTERN_TITLE_MARGIN}px auto;
    text-align: center;
`;

// Overall height of Title: 72px (32px for the text, + 2x20px of margin)
const S_Title = styled.h1`
    line-height: ${TITLE_HEIGHT}rem;
    margin: ${TITLE_MARGIN}px 0;
`;

export default App;
