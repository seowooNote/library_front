/** @jsxImportSource @emotion/react */
import OAuth2Page from "../OAuth2Page/OAuth2Page";
import OAuth2SignupPage from "../OAuth2SignupPage/OAuth2SignupPage";
import SigninPage from "../SigninPage/SigninPage";
import SingupPage from "../SignupPage/SignupPage";
import OAuth2SinginPage from "../OAuth2SinginPage/OAuth2SinginPage";
import * as s from "./style";
import { Route, Routes } from "react-router-dom";
import { useQueryClient } from "react-query";
import { useEffect } from "react";

function AuthPage() {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueriesData("principalQuery");

  useEffect(() => {
    if(!!principalData) {
      alert("잘못된 접근입니다.");
      window.location.replace("/");
    }
  }, [])

  return (
    <div css={s.layout}>
        <Routes>
            <Route path="/signin" element={ <SigninPage /> }/>
            <Route path="/signup" element={ <SingupPage /> } />
            <Route path="/oauth2" element={ <OAuth2Page /> }/>
            <Route path="/oauth2/signin" element={ <OAuth2SinginPage/> } />
            <Route path="/oauth2/merge"/>
            <Route path="/oauth2/signup" element={ <OAuth2SignupPage /> } />
        </Routes>
    </div>
  )
}

export default AuthPage;