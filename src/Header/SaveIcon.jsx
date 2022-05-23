import { SaveOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { URL } from "../Theme/constants";
import fetchHeader from "./fetchHeader";
import useAPICallAlert from "./useAPICallAlert";

// When logged in, the user will be able to see this icon.
// When clicking on it, they will be able to save the pattern they're working on
function SaveIcon({ points, segments, curves, pieceName, credentials }) {
    // Saving all the pattern geometries in the backend
    function save() {
        //  Creating a header for the POST call, in `saving` mode
        const headers = fetchHeader(credentials, "saving");
        let data = {
            name: uuidv4(),
            description: pieceName,
            points: points,
            segments: segments,
            curves: curves,
        };

        fetch(URL, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                // json.description will be the name of the pattern if the save is successful
                // Beware: id the user put no pattern name, description will be an empty string!
                if (json.description || json.description === "") {
                    setSaveAlert(
                        `You have successfully saved "${json.description}"!`
                    );
                } else {
                    setSaveAlert(
                        "Warning: unsuccessful save - wrong credentials."
                    );
                }
            });
    }

    // This alert will contain a message specifying whether saving worked or not
    const [saveAlert, setSaveAlert] = useAPICallAlert();

    return (
        <S_SaveIcon>
            <S_SaveOutlined onClick={() => save()} />
            <p>Save</p>
            {saveAlert ? <S_SaveAlert>{saveAlert}</S_SaveAlert> : null}
        </S_SaveIcon>
    );
}

const S_SaveAlert = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    border: solid 1px ${({ theme }) => theme.colours.contrast};
    margin-top: 4px;
    padding: 4px 8px;
    position: absolute;
    right: 0px;
    width: 200px;
    z-index: 1;
`;

const S_SaveIcon = styled.div`
    position: relative;
`;

const S_SaveOutlined = styled(SaveOutlined)`
    cursor: pointer;
`;

export default SaveIcon;
