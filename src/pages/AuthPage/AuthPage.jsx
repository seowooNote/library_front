/** @jsxImportSource @emotion/react */
import SingupPage from "../SignupPage/SingupPage";
import * as s from "./style";
import { Route, Routes } from "react-router-dom";

function AuthPage() {
  return (
    <div css={s.layout}>
        <Routes>
            <Route path="/signin"/>
            <Route path="/signup" element={ <SingupPage /> } />
            <Route path="/signup/oauth"/>
        </Routes>
    </div>
  )
}

export default AuthPage;