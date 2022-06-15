import CurvesDisplay from "./CurveLogic/CurvesDisplay";
import GridChangeDisplay from "./GridChangeDisplay";
import PointsDisplay from "./PointLogic/PointsDisplay";
import SegmentsDisplay from "./SegmentLogic/SegmentsDisplay";
import styled from "styled-components";

function Aside({
    height,
    points,
    segments,
    setSegments,
    alertMessage,
    setAlertMessage,
    curves,
    setCurves,
    cellSize,
    numCells,
    setNumCells,
    setVerticalGridPosition,
    setHorizontalGridPosition,
}) {
    return (
        <S_Aside height={height}>
            <div>
                <PointsDisplay points={points} height={height} />

                <SegmentsDisplay
                    height={height}
                    points={points}
                    segments={segments}
                    setSegments={setSegments}
                    alertMessage={alertMessage}
                    setAlertMessage={setAlertMessage}
                />

                <CurvesDisplay
                    height={height}
                    points={points}
                    curves={curves}
                    setCurves={setCurves}
                    cellSize={cellSize}
                    alertMessage={alertMessage}
                    setAlertMessage={setAlertMessage}
                />
            </div>

            <GridChangeDisplay
                setNumCells={setNumCells}
                numCells={numCells}
                setHorizontalGridPosition={setHorizontalGridPosition}
                setVerticalGridPosition={setVerticalGridPosition}
            />
        </S_Aside>
    );
}

const S_Aside = styled.aside`
    display: flex;
    flex-direction: column;
    height: ${(props) => props.height - 16}px;
    justify-content: space-between;
`;

export default Aside;
