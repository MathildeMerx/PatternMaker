import RangeInput from "./Theme/RangeInput";
import HoverInfo from "./Theme/HoverInfo";

//To let the user decide how many cells are visible on screen
function NumCellsInput({ numColumns, setNumColumns, numRows, setNumRows }) {
    return (
        <div>
            {/* Here the user will decide on the number of columns*/}
            Number of columns: {numColumns}
            <HoverInfo>
                Beware when printing: cells will be square, so what you see on
                screen may be distorted!
            </HoverInfo>
            <RangeInput
                type="range"
                min="10"
                max="50"
                value={numColumns}
                onChange={(e) => setNumColumns(parseInt(e.target.value))}
            />
            {/* Here the user will decide on the number of columns*/}
            Number of rows: {numRows}
            <HoverInfo>
                Beware when printing: cells will be square, so what you see on
                screen may be distorted!
            </HoverInfo>
            <RangeInput
                type="range"
                min="10"
                max="50"
                value={numRows}
                onChange={(e) => setNumRows(parseInt(e.target.value))}
            />
        </div>
    );
}

export default NumCellsInput;
