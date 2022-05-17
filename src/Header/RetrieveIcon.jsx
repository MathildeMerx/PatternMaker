import { availablePointNames } from "./availablePointNames";
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
    function onRetrieveSuccess(retrievedData) {
        //If the call is successful, we retrieve the latest save
        const data = retrievedData.slice(0).sort(function (x, y) {
            return y.id - x.id;
        })["0"];

        //The right data is assigned to the right variables
        setPoints(JSON.parse(JSON.stringify(data["points"])));
        setSegments(JSON.parse(JSON.stringify(data["segments"])) ?? []);
        setCurves(JSON.parse(JSON.stringify(data["curves"])) ?? {});

        //We deduce the available point names based on the existing points
        setPossiblePointNames(
            availablePointNames(JSON.parse(JSON.stringify(data["points"])))
        );

        //We retrieve the name of the pattern
        setPieceName(JSON.parse(JSON.stringify(data["description"])));

        //We specify the retrieving worked
        setRetrieveAlert(
            `"${JSON.parse(
                JSON.stringify(data["description"])
            )}" successfully retrieved!`
        );
    }

    return (
        <S_RetrieveIcon>
            <S_FileDownload
                onClick={() =>
                    retrieve(onRetrieveSuccess, setRetrieveAlert, credentials)
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
    z-index: 1;
`;

const S_RetrieveIcon = styled.div`
    position: relative;
`;

const S_FileDownload = styled(FileDownload)`
    cursor: pointer;
`;
