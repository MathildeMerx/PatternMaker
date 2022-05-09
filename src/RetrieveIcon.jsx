import { retrieve } from "./retrieve";
import { FileDownload } from "@mui/icons-material";
import styled from "styled-components";
import { useEffect, useState } from "react";

//Icon to retrieve the latest pattern from the database
function RetrieveIcon({
    setPoints,
    setSegments,
    setCurves,
    setPossiblePointNames,
    setPieceName,
    credentials,
}) {
    //This alert will contain a message specifying whether the retrieve worked or not
    const [retrieveAlert, setRetrieveAlert] = useState(false);

    //After 3 seconds, the alert message will be deleted
    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setRetrieveAlert(false);
        }, 3000);

        return () => clearTimeout(alertTimer);
    }, [setRetrieveAlert, retrieveAlert]);

    return (
        <S_RetrieveIcon>
            <S_FileDownload
                onClick={() =>
                    retrieve(
                        setPoints,
                        setSegments,
                        setCurves,
                        setPossiblePointNames,
                        setPieceName,
                        setRetrieveAlert,
                        credentials
                    )
                }
            />
            <p>Retrieve</p>
            {retrieveAlert ? (
                <S_RetrieveAlert>{retrieveAlert}</S_RetrieveAlert>
            ) : null}
        </S_RetrieveIcon>
    );
}

export { RetrieveIcon };

const S_RetrieveAlert = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    border: solid 1px ${({ theme }) => theme.colours.contrast};
    margin-top: 4px;
    padding: 4px 8px;
    position: absolute;
    right: 0px;
    width: 200px;
`;

const S_RetrieveIcon = styled.div`
    position: relative;
`;

const S_FileDownload = styled(FileDownload)`
    cursor: pointer;
`;
