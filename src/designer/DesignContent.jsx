import styled from "styled-components";
import Grid from "./Grid";
import PatternNameForm from "./PatternNameForm";
import { GRID_MARGIN, TITLE_MARGIN, TITLE_HEIGHT } from "../Theme/constants";

function DesignContent({
    containerRef,
    pieceName,
    setPieceName,
    numCells,
    points,
    setPoints,
    cellSize,
    segments,
    curves,
    setCurves,
    setAlertMessage,
    verticalGridPosition,
    horizontalGridPosition,
}) {
    return (
        <S_DesignContent ref={containerRef}>
            {/* Form to modify the pattern name */}
            <PatternNameForm
                pieceName={pieceName}
                setPieceName={setPieceName}
            />

            {/* Grid in which the user can design their pattern, and see it */}
            <S_DrawGrid>
                <Grid
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
            </S_DrawGrid>
        </S_DesignContent>
    );
}

const S_DesignContent = styled.section`
    height: calc(100% - ${TITLE_MARGIN * 2 + TITLE_HEIGHT * 16}px);
    width: calc(100% - ${GRID_MARGIN}px);
`;

const S_DrawGrid = styled.div`
    line-height: 0%;
`;

export default DesignContent;
