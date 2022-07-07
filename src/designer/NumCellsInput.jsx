import RangeInput from "../Theme/RangeInput";
import HoverInfo from "../Theme/HoverInfo";

//To let the user decide how many cells are visible on screen
function NumCellsInput({ numCells, setNumCells }) {
    return (
        <div>
            {/* Here the user will decide on the number of columns*/}
            Number of columns: {numCells}
            <HoverInfo>
                Beware when printing: cells will be square, so what you see on
                screen may be distorted!
            </HoverInfo>
            <RangeInput
                type="range"
                min="10"
                max="50"
                value={numCells}
                onChange={(e) => setNumCells(parseInt(e.target.value))}
            />
        </div>
    );
}

export default NumCellsInput;
