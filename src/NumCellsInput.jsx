import { RangeInput } from "./Theme/RangeInput";
import { InfoOutlined } from "@mui/icons-material";
import { S_HoverInfoIcon } from "./S_HoverInfoIcon";

//To let the user decide how many cells are visible on screen
function NumCellsInput({ numColumns, setNumColumns, numRows, setNumRows }) {
    return (
        <div>
            {/* Here the user will decide on the number of columns*/}
            Number of columns: {numColumns}
            <S_HoverInfoIcon>
                <InfoOutlined />
                <div>
                    Beware when printing: cells will be square, so what you see
                    on screen may be distorted!
                </div>
            </S_HoverInfoIcon>
            <RangeInput
                type="range"
                min="10"
                max="50"
                value={numColumns}
                onChange={(e) => setNumColumns(parseInt(e.target.value))}
            />
            {/* Here the user will decide on the number of columns*/}
            Number of rows: {numRows}
            <S_HoverInfoIcon>
                <InfoOutlined />
                <div>
                    Beware when printing: cells will be square, so what you see
                    on screen may be distorted!
                </div>
            </S_HoverInfoIcon>
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

export { NumCellsInput };
