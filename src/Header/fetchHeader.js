function fetchHeader(credentials, retrieveOrSave) {
    let headers = new Headers();
    let username = credentials.username;
    let password = credentials.password;
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));

    switch (retrieveOrSave) {
        case "retrieving":
            return headers;
        case "saving":
            headers.append("Accept", "application/json");
            headers.append("Content-Type", "application/json");
            return headers;
        default:
            throw new Error(
                'Trying to make a header neither to retrieve nor to save in "src/Header/fetchHeader"'
            );
    }
}

export default fetchHeader;
