/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import * as s from "./style";


function OAuth2SinginPage() {
    const [ searchParams ] = useSearchParams();
    const accessToken = searchParams.get("accessToken");

    useEffect(() => {
        localStorage.setItem("AccessToken", accessToken);
        window.location.replace("/");
    }, []);

    return (
        <div>OAuth2SinginPage</div>
    )
}

export default OAuth2SinginPage