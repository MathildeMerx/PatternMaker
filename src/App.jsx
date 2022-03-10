import { useState } from "react";
import "./App.css";
import { GridCell } from "./GridCell";
import { useContainerDimensions } from "./useContainerDimensions";
import { SegmentsDisplay } from "./SegmentsDisplay";

function App() {
    let [{ width, height }, containerRef] = useContainerDimensions();

    const gridSpacing = 50;

    const numCellWidth = Math.floor((width - 32) / gridSpacing);

    const numCellHeight = Math.floor((height - 80) / gridSpacing) - 1;

    const numButton = (numCellHeight - 1) * (numCellWidth - 1);

    const [points, setPoints] = useState(Array(numButton).fill(""));
    const [segments, setSegments] = useState([]);

    let existingPoints = points.filter((x) => x).sort();
    existingPoints = existingPoints.map((x) => [
        x,
        Math.floor(points.indexOf(x) / (numCellHeight - 1)) + 1,
        (points.indexOf(x) % (numCellHeight - 1)) + 1,
    ]);

    return (
        <div className="content">
            <header>
                <h1 className="title">Pattern designer</h1>
            </header>
            <main className="grid">
                <aside>
                    <h3>Points</h3>
                    <ul className="controlled-height">
                        {existingPoints.map(([pointName, xIndex, yIndex]) => (
                            <li key={pointName}>
                                {" "}
                                {`${pointName} (${xIndex}, ${yIndex})`}
                            </li>
                        )) ?? null}
                    </ul>
                    <SegmentsDisplay
                        existingPoints={existingPoints}
                        segments={segments}
                        setSegments={setSegments}
                    />
                </aside>
                <section className="design-content" ref={containerRef}>
                    <h2 className="pattern-name">GRID</h2>
                    <GridCell
                        numCellWidth={numCellWidth}
                        numCellHeight={numCellHeight}
                        numButton={numButton}
                        points={points}
                        setPoints={setPoints}
                        gridSpacing={gridSpacing}
                        segments={segments}
                    />
                </section>
            </main>
        </div>
    );
}

export default App;
