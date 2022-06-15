import { Fragment } from "react";
import styled from "styled-components";

function Column({ line, cellSize, horizontalGridPosition }) {
    return (
        <Fragment>
            <S_Column left={line * cellSize} />
            {line % 5 === 0 ? (
                <S_ColumnIndex left={line * cellSize + (line === 5 ? 4 : 0)}>
                    {line + horizontalGridPosition}
                </S_ColumnIndex>
            ) : null}
        </Fragment>
    );
}

const S_Column = styled.div`
    background-color: ${({ theme }) => theme.colours.backgroundLight};
    height: 100%;
    left: ${(props) => props.left}px;
    position: absolute;
    top: 0;
    width: 1px;
    z-index: -1;
`;

const S_ColumnIndex = styled.div`
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 0.8em;
    left: ${(props) => props.left - 6}px;
    position: absolute;
    top: -8px;
`;

export default Column;
