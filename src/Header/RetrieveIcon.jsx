import availablePointNames from "./availablePointNames";
import { FileDownload } from "@mui/icons-material";
import styled from "styled-components";
import { URL } from "../Theme/constants";
import fetchHeader from "./fetchHeader";
import useAPICallAlert from "./useAPICallAlert";

// Icon to retrieve the latest pattern from the database
function RetrieveIcon({
    setPoints,
    setSegments,
    setCurves,
    setPossiblePointNames,
    setPieceName,
    credentials,
}) {
    // Function to retrieve the latest saved pattern
    function retrieve() {
        // Creating a header for the GET call, in `retrieving` mode
        let headers = fetchHeader(credentials, "retrieving");

        fetch(URL, { method: "GET", headers: headers })
            .then((response) => {
                return response.json();
            })
            // When wrong credentials are given, the json object has a detail key
            .then((json) => {
                if (json.detail) {
                    setRetrieveAlert(
                        "Warning: retrieve failed - wrong credentials."
                    );
                } else {
                    // Function affecting data to the right variables - see below
                    onRetrieveSuccess(json);
                }
            })
            // If there is an error, an alert message will be displayed
            .catch((error) => console.log(error));
    }

    // This alert will contain a message specifying whether the retrieve worked or not
    const [retrieveAlert, setRetrieveAlert] = useAPICallAlert();

    // When retrieving succeeded, the data obtained are affected to the relevant states
    function onRetrieveSuccess(retrievedData) {
        // First we retrieve the latest save(that's the one with the highest ID)
        const data = retrievedData.slice(0).sort(function (x, y) {
            return y.id - x.id;
        })["0"];

        // The right data is assigned to the right variables
        setPoints(JSON.parse(JSON.stringify(data["points"])));
        setSegments(JSON.parse(JSON.stringify(data["segments"])) ?? []);
        setCurves(JSON.parse(JSON.stringify(data["curves"])) ?? {});

        // We deduce the available point names based on the existing points
        setPossiblePointNames(
            availablePointNames(JSON.parse(JSON.stringify(data["points"])))
        );

        // We retrieve the name of the pattern
        setPieceName(JSON.parse(JSON.stringify(data["description"])));

        // We specify the retrieving worked
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

export default RetrieveIcon;
