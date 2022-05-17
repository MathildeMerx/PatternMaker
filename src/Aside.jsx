import { CurvesDisplay } from "./CurveLogic/CurvesDisplay";
import { NumCellsInput } from "./NumCellsInput";
import { PointsDisplay } from "./PointLogic/PointsDisplay";
import { SegmentsDisplay } from "./SegmentLogic/SegmentsDisplay";
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
    cellHeight,
    cellWidth,
    numColumns,
    setNumColumns,
    numRows,
    setNumRows,
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
    );
}

const S_Aside = styled.aside`
    display: flex;
    flex-direction: column;
    height: ${(props) => props.height - 16}px;
    justify-content: space-between;
`;

export default Aside;
