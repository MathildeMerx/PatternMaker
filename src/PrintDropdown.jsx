import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { S_Input } from "./App";
import { S_CommandsDropdown } from "./S_CommandsDropdown";
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
            <S_CommandsDropdown clicked={clicked}>
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
            </S_CommandsDropdown>
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

const S_PrintButton = styled(Button)`
    margin-left: auto;
`;
