import { RangeInput } from "./Theme/RangeInput";
import { InfoOutlined } from "@mui/icons-material";
import { S_HoverInfoIcon } from "./S_HoverInfoIcon";

function NumCellsInput({ numColumns, setNumColumns, numRows, setNumRows }) {
    return (
        <div>
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
