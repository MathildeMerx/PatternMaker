import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { useRef, useEffect, useState } from "react";
import { S_Input } from "./App";

import { Print, ExpandMore } from "@mui/icons-material";

function PrintDropdown({
    printRef,
    colWidth,
    setColWidth,
    rowHeight,
    setRowHeight,
}) {
    //Creating a dropdown menu, enabling the user to customize the printing
    const printButtonRef = useRef();
    const [clicked, setClicked] = useState(false);
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                printButtonRef.current &&
                !printButtonRef.current.contains(event.target)
            ) {
                setClicked(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [printButtonRef, setClicked]);
    return (
        <S_PrintMenu ref={printButtonRef}>
            <Print onClick={() => setClicked(!clicked)} />
            <ExpandMore onClick={() => setClicked(!clicked)} />
            <S_PrintDropdown clicked={clicked}>
                Column width: {colWidth}cm
                <S_Input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={colWidth}
                    onChange={(e) => setColWidth(e.target.value)}
                />
                Row height: {rowHeight}cm
                <S_Input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={rowHeight}
                    onChange={(e) => setRowHeight(e.target.value)}
                />
                <ReactToPrint
                    trigger={() => <button>Print</button>}
                    content={() => printRef.current}
                    onAfterPrint={() => setClicked(false)}
                />
            </S_PrintDropdown>
        </S_PrintMenu>
    );
}

export { PrintDropdown };

const S_PrintMenu = styled.span`
    position: relative;
`;

const S_PrintDropdown = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    color: ${({ theme }) => theme.colours.contrast};
    border: solid 1px;
    display: ${(props) => (props.clicked ? "block" : "none")};
    right: 0;
    position: absolute;
    top: 24px;
    width: 175px;
`;
