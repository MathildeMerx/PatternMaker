import { Fragment } from "react";
import styled from "styled-components";

function Row({ line, cellHeight, width }) {
    return (
        <Fragment>
            <S_Row top={line * cellHeight} />
            {line % 5 === 0 ? (
                <S_RowIndex right={width} top={line * cellHeight}>
                    {line}
                </S_RowIndex>
            ) : null}
        </Fragment>
    );
}

const S_Row = styled.div`
    background-color: ${({ theme }) => theme.colours.backgroundLight};
    height: 1px;
    left: 0;
    position: absolute;
    top: ${(props) => props.top}px;
    width: 100%;
    z-index: -1;
`;

const S_RowIndex = styled.div`
    color: ${({ theme }) => theme.colours.contrast};
    font-size: 0.8em;
    position: absolute;
    right: ${(props) => props.right + 4}px;
    top: ${(props) => props.top}px;
`;

export default Row;
