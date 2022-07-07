import ReactToPrint from "react-to-print";
import styled from "styled-components";
import { useRef } from "react";
import RangeInput from "../../Theme/RangeInput";
import S_CommandsDropdown from "./S_CommandsDropdown";
import { Print } from "@mui/icons-material";
import Button from "../../Theme/Button";
import { useEffectCloseClickOutside } from "../useCloseClickOutside";

function PrintDropdown({
    printRef,
    cellSizePrinting,
    setCellSizePrinting,
    printMenuOpen,
    setPrintMenuOpen,
}) {
    const printButtonRef = useRef();

    // When someone clicks outside of the menu while it's open,
    // the menu gets closed
    useEffectCloseClickOutside(printButtonRef, setPrintMenuOpen);

    return (
        <S_PrintMenu ref={printButtonRef}>
            <S_Print onClick={() => setPrintMenuOpen(!printMenuOpen)} />
            {/*The user can pick the size of the cells when printing */}
            <S_CommandsDropdown menuOpen={printMenuOpen}>
                Cell size: {cellSizePrinting}cm
                <RangeInput
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.05"
                    value={cellSizePrinting}
                    onChange={(e) => setCellSizePrinting(e.target.value)}
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
const S_Print = styled(Print)`
    cursor: pointer;
`;

const S_PrintMenu = styled.span`
    position: relative;
`;

const S_PrintButton = styled(Button)`
    margin-left: auto;
`;

export default PrintDropdown;
