import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { useRef, useEffect } from "react";
import { RangeInput } from "../Theme/RangeInput";
import { S_CommandsDropdown } from "./S_CommandsDropdown";
import { Print } from "@mui/icons-material";
import { Button } from "../Theme/Button";

function PrintDropdown({
    printRef,
    cellSize,
    setCellSize,
    printMenuOpen,
    setPrintMenuOpen,
}) {
    //Creating a dropdown menu, enabling the user to customize the printing
    const printButtonRef = useRef();

    //When the menu is open, if the user clicks elsewhere the menu closes
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                printButtonRef.current &&
                !printButtonRef.current.contains(event.target)
            ) {
                setPrintMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [printButtonRef, setPrintMenuOpen]);

    return (
        <S_PrintMenu ref={printButtonRef}>
            <S_Print onClick={() => setPrintMenuOpen(!printMenuOpen)} />
            {/*The user can pick the size of the cells when printing */}
            <S_CommandsDropdown menuOpen={printMenuOpen}>
                Cell size: {cellSize}cm
                <RangeInput
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={cellSize}
                    onChange={(e) => setCellSize(e.target.value)}
                />
                {/*This component makes it possible to print only one component */}
                <ReactToPrint
                    trigger={() => <S_PrintButton>Print</S_PrintButton>}
                    content={() => printRef.current}
                    onAfterPrint={() => setPrintMenuOpen(false)}
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
