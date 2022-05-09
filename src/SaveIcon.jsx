import { save } from "./save";
import { SaveOutlined } from "@mui/icons-material";
import styled from "styled-components";
import { useEffect, useState } from "react";

//When logged in, the user will be able to see this icon.
//When clicking on it, they will be able to save the pattern they're working on
function SaveIcon({ points, segments, curves, pieceName, credentials }) {
    //This state will contain a message after the user has clicked on save
    //This message will tell the user whether the save was successful or not
    const [saveAlert, setSaveAlert] = useState(false);

    //After 3 sec, the message is erased
    useEffect(() => {
        const alertTimer = setTimeout(() => {
            setSaveAlert(false);
        }, 3000);

        return () => clearTimeout(alertTimer);
    }, [setSaveAlert, saveAlert]);

    return (
        <S_SaveIcon>
            <S_SaveOutlined
                onClick={() =>
                    save(
                        points,
                        segments,
                        curves,
                        pieceName,
                        setSaveAlert,
                        credentials
                    )
                }
            />
            <p>Save</p>
            {saveAlert ? <S_SaveAlert>{saveAlert}</S_SaveAlert> : null}
        </S_SaveIcon>
    );
}

export { SaveIcon };

const S_SaveAlert = styled.div`
    background-color: ${({ theme }) => theme.colours.background};
    border: solid 1px ${({ theme }) => theme.colours.contrast};
    margin-top: 4px;
    padding: 4px 8px;
    position: absolute;
    right: 0px;
    width: 200px;
`;

const S_SaveIcon = styled.div`
    position: relative;
`;

const S_SaveOutlined = styled(SaveOutlined)`
    cursor: pointer;
`;
