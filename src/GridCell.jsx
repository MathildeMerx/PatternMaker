import { useContainerDimensions } from "./useContainerDimensions";
import "./App.css";

function GridCell() {
    const [{ width, height }, containerRef] = useContainerDimensions();
    console.log(`width: ${width}, height: ${height}`);

    const numCellWidth = Math.floor(width / 50);
    const numCellHeight = Math.floor(height / 50);
    const numCell = numCellWidth * numCellHeight;

    const arrWidth = [...Array(numCellWidth).keys()];
    const arrHeight = [...Array(numCellHeight).keys()];

    return (
        <div className="design-grid" ref={containerRef}>
            {arrWidth.map((line) => (
                <div
                    key={line}
                    className="column"
                    style={{ left: `${line * 50}px` }}
                />
            ))}
            {arrHeight.map((line) => (
                <div
                    key={line}
                    className="row"
                    style={{ top: `${line * 50}px` }}
                />
            ))}
            {/* {arr.map((cell) => {
                return <div key={cell} className="line " />;
                if (cell === 0) {
                    return <div key={cell} className="line first-cell"></div>;
                }
                if (cell < numCellWidth) {
                    return <div key={cell} className="line top-cell"></div>;
                } else if (cell % numCellWidth === 0) {
                    return <div key={cell} className="line right-cell"></div>;
                } else {
                    return (
                        <div key={cell} className="line">
                            <button className="point-button"></button>
                        </div>
                    );
                }
            })} */}
        </div>
    );
}

export { GridCell };
