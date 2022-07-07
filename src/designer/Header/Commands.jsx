import styled from "styled-components";
import { Logout } from "@mui/icons-material";
import SaveIcon from "./SaveIcon";
import RetrieveIcon from "./RetrieveIcon";
import LogIn from "./LogIn";
import PrintDropdown from "./PrintDropdown";

function Commands({
    credentials,
    setCredentials,
    points,
    segments,
    curves,
    pieceName,
    setPoints,
    setSegments,
    setCurves,
    setPossiblePointNames,
    setPieceName,
    cellSizePrinting,
    setCellSizePrinting,
    printRef,
    printMenuOpen,
    setPrintMenuOpen,
}) {
    return (
        <S_Commands>
            {/* If the user is connected, we want to see a log out, save and retrieve icons. Else, only a log in icon. */}
            {credentials?.loggedIn ? (
                <>
                    <div>
                        <S_Logout
                            onClick={() =>
                                setCredentials({
                                    username: "",
                                    password: "",
                                    loggedIn: false,
                                })
                            }
                        />
                        Log out
                    </div>

                    <SaveIcon
                        points={points}
                        segments={segments}
                        curves={curves}
                        pieceName={pieceName}
                        credentials={credentials}
                    />

                    <RetrieveIcon
                        setPoints={setPoints}
                        setSegments={setSegments}
                        setCurves={setCurves}
                        setPossiblePointNames={setPossiblePointNames}
                        setPieceName={setPieceName}
                        credentials={credentials}
                    />
                </>
            ) : (
                <LogIn setCredentials={setCredentials} />
            )}

            {/* The print icon is shown whether logged in or not */}
            <div>
                <PrintDropdown
                    cellSizePrinting={cellSizePrinting}
                    setCellSizePrinting={setCellSizePrinting}
                    printRef={printRef}
                    printMenuOpen={printMenuOpen}
                    setPrintMenuOpen={setPrintMenuOpen}
                />
                <p>Print</p>
            </div>
        </S_Commands>
    );
}

const S_Commands = styled.div`
    align-items: baseline;
    color: ${({ theme }) => theme.colours.bright};
    gap: 20px;
    justify-content: flex-end;
    display: flex;
    min-width: 120px;

    & div svg {
        display: block;
        margin: auto;
    }

    & div p {
        margin: 0;
    }
`;

const S_Logout = styled(Logout)`
    cursor: pointer;
`;

export default Commands;
