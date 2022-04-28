import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { S_Input } from "./App";

import { Print } from "@mui/icons-material";
import { Button } from "./Theme/Button";

function PrintDropdown({
    printRef,
    cellSize,
    setCellSize,
    clicked,
    setClicked,
}) {
    //Creating a dropdown menu, enabling the user to customize the printing
    const printButtonRef = useRef();
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
            <S_Print onClick={() => setClicked(!clicked)} />
            <S_PrintDropdown clicked={clicked}>
                Cell size: {cellSize}cm
                <S_Input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={cellSize}
                    onChange={(e) => setCellSize(e.target.value)}
                />
                <ReactToPrint
                    trigger={() => <S_PrintButton>Print</S_PrintButton>}
                    content={() => printRef.current}
                    onAfterPrint={() => setClicked(false)}
                    pageStyle="@page { size: 21cm 29.7cm }"
                />
            </S_PrintDropdown>
        </S_PrintMenu>
    );
}

export { PrintDropdown };

const S_Print = styled(Print)`
    cursor: pointer;
`;

const S_PrintMenu = styled.span`
    position: relative;
`;

const S_PrintDropdown = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    border: solid 1px;
    color: ${({ theme }) => theme.colours.contrast};
    display: ${(props) => (props.clicked ? "flex" : "none")};
    flex-direction: column;
    padding: 8px;
    position: absolute;
    right: 0;
    top: 24px;
    width: 175px;
    z-index: 1;
`;

const S_PrintButton = styled(Button)`
    margin-left: auto;
`;
