import { useEffect, useState } from "react";

function useAPICallAlert() {
    const [alert, setAlert] = useState(false);

    // After 3 seconds, the alert message will be deleted
    useEffect(() => {
        if (alert) {
            const alertTimer = setTimeout(() => {
                setAlert(false);
            }, 3000);

            return () => clearTimeout(alertTimer);
        }
    }, [alert]);
    return [alert, setAlert];
}

export default useAPICallAlert;
