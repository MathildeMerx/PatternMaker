import Button from "../Theme/Button";
import styled from "styled-components";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import { PATTERN_TITLE_MARGIN, PATTERN_TITLE_HEIGHT } from "../Theme/constants";

//Form to let the user choose the name of the pattern
function PatternNameForm({ pieceName, setPieceName }) {
    const [editingName, setEditingName] = useState(false);
    //The state `editingName` stores whether the user is currently
    //editing the name or not
    return editingName ? (
        <S_NameForm onSubmit={() => setEditingName(false)}>
            <label htmlFor="Title-piece-of-pattern">
                <S_PatternNameModify
                    id="Title-piece-of-pattern"
                    type="text"
                    placeholder="Choose a pattern name"
                    value={pieceName}
                    onChange={(event) => setPieceName(event.target.value)}
                ></S_PatternNameModify>
            </label>

            <Button type="submit">Submit</Button>
        </S_NameForm>
    ) : (
        <S_PatternName>
            {pieceName}
            <S_EditIcon>
                <Edit onClick={() => setEditingName(true)} />
            </S_EditIcon>
        </S_PatternName>
    );
}

const S_NameForm = styled.form`
    text-align: center;
`;

const S_PatternNameModify = styled.input`
    background-color: ${({ theme }) => theme.colours.background};
    border: none;
    border-bottom: 3px solid;
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 1.5rem;
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: ${PATTERN_TITLE_MARGIN - 4}px auto;
    margin-right: 8px;
    text-align: center;

    &:focus-visible {
        border-style: none none solid;
        border-color: ${({ theme }) => theme.colours.bright};
        outline: none;
    }
`;

const S_PatternName = styled.h2`
    line-height: ${PATTERN_TITLE_HEIGHT}px;
    margin: 0px auto ${PATTERN_TITLE_MARGIN}px;
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

export default PatternNameForm;
