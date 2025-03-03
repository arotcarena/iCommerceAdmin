import { useAlert } from "Components/Contexts/AlertContext";
import { logoutUser } from "functions/auth/logoutUser";
import { generateUrl } from "functions/router/urlGenerator";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function Logout() {
    const navigate = useNavigate();
    const {createAlert} = useAlert();
    
    useEffect(() => {
        if(navigate && createAlert) {
            logoutUser(createAlert);
            navigate(generateUrl('home'));
        }
    }, [createAlert, navigate]);

    return (
        <></>
    )
}