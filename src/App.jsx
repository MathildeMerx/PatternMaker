import { useState } from "react";
import { Grid } from "./Grid";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentsDisplay";
import { PointsDisplay } from "./PointsDisplay";
import { CurvesDisplay } from "./CurvesDisplay";
import styled from "styled-components";

function App() {
    let [{ width, height }, containerRef] = useContainerDimensions();

    const gridSpacing = 16;

    const numCellWidth = Math.floor((width - GRID_MARGIN) / gridSpacing);

    const numCellHeight = Math.floor(
        (height - (PATTERN_TITLE_MARGIN * 2 + PATTERN_TITLE_HEIGHT)) /
            gridSpacing
    );

    const numButton = (numCellHeight - 1) * (numCellWidth - 1);

    const [existingPoints, setExistingPoints] = useState({});
    const [segments, setSegments] = useState([]);
    const [curves, setCurves] = useState([]);

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
                    />
                    <CurvesDisplay
                        existingPoints={existingPoints}
                        curves={curves}
                        setCurves={setCurves}
                    />
                </aside>
                <S_DesignContent ref={containerRef}>
                    <S_PatternName>GRID</S_PatternName>
                    <Grid
                        numCellWidth={numCellWidth}
                        numCellHeight={numCellHeight}
                        numButton={numButton}
                        existingPoints={existingPoints}
                        setExistingPoints={setExistingPoints}
                        gridSpacing={gridSpacing}
                        segments={segments}
                        curves={curves}
                        setCurves={setCurves}
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
