//We retrieve the latest saved pattern
function retrieve(onRetrieveSuccess, setRetrieveAlert, credentials) {
    let headers = new Headers();
    let username = credentials[0];
    let password = credentials[1];
    headers.set("Authorization", "Basic " + btoa(username + ":" + password));
    let url = "https://sewpat.tsango.com/api/patterns/4/drawings/";
    fetch(url, { method: "GET", headers: headers })
        .then((response) => {
            return response.json();
        })
        .then((json) => {
            if (json.detail) {
                setRetrieveAlert(
                    "Warning: retrieve failed - wrong credentials."
                );
            } else {
                onRetrieveSuccess(json);
            }
        })
        //If there is an error, an alert message will be displayed
        .catch((error) => console.log(error));
}

export { retrieve };
