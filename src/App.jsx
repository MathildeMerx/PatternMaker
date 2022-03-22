import { useState } from "react";
import "./App.css";
import { Grid } from "./Grid";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentsDisplay";
import { PointsDisplay } from "./PointsDisplay";
import { CurvesDisplay } from "./CurvesDisplay";

function App() {
    let [{ width, height }, containerRef] = useContainerDimensions();

    const gridSpacing = 50;

    const numCellWidth = Math.floor((width - 32) / gridSpacing);

    const numCellHeight = Math.floor((height - 80) / gridSpacing) - 1;

    const numButton = (numCellHeight - 1) * (numCellWidth - 1);

    const [existingPoints, setExistingPoints] = useState({});
    const [segments, setSegments] = useState([]);
    const [curves, setCurves] = useState([]);

    return (
        <div className="content">
            <header>
                <h1 className="title">Pattern designer</h1>
            </header>
            <main className="grid">
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
                <section className="design-content" ref={containerRef}>
                    <h2 className="pattern-name">GRID</h2>
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
                </section>
            </main>
        </div>
    );
}

export default App;
