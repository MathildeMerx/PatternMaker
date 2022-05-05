import { Button } from "./Theme/Button";
import styled from "styled-components";
import { Edit } from "@mui/icons-material";

function PatternNameForm({
    editingName,
    setEditingName,
    pieceName,
    setPieceName,
    PATTERN_TITLE_HEIGHT,
    PATTERN_TITLE_MARGIN,
}) {
    return (
        <>
            {editingName ? (
                <form
                    onSubmit={() => setEditingName(false)}
                    style={{ textAlign: "center" }}
                >
                    <label htmlFor="Title-piece-of-pattern">
                        <S_PatternNameModify
                            PATTERN_TITLE_MARGIN={PATTERN_TITLE_MARGIN}
                            PATTERN_TITLE_HEIGHT={PATTERN_TITLE_HEIGHT}
                            id="Title-piece-of-pattern"
                            type="text"
                            value={pieceName}
                            onChange={(event) =>
                                setPieceName(
                                    event.target.value === ""
                                        ? "Choose a name"
                                        : event.target.value
                                )
                            }
                        ></S_PatternNameModify>
                    </label>
                    <Button type="submit">Submit</Button>
                </form>
            ) : (
                <S_PatternName>
                    {pieceName}
                    <S_EditIcon>
                        <Edit onClick={() => setEditingName(true)} />
                    </S_EditIcon>
                </S_PatternName>
            )}
        </>
    );
}

export { PatternNameForm };

const S_PatternNameModify = styled.input`
    background-color: ${({ theme }) => theme.colours.background};
    border: none;
    border-bottom: 3px solid;
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 1.5rem;
    line-height: ${(props) => props.PATTERN_TITLE_HEIGHT}px;
    margin: ${(props) => props.PATTERN_TITLE_MARGIN - 4}px auto;
    margin-right: 8px;
    text-align: center;

    &:focus-visible {
        outline: none;
    }
`;

const S_PatternName = styled.h2`
    line-height: ${(props) => props.PATTERN_TITLE_HEIGHT}px;
    margin: ${(props) => props.PATTERN_TITLE_MARGIN}px auto;
    text-align: center;
`;

const S_EditIcon = styled.span`
    cursor: pointer;
    margin-left: 10px;
    position: relative;
    top: 4px;

    &:hover {
        color: ${({ theme }) => theme.colours.bright};
    }
`;
