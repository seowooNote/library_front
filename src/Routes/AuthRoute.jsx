import { Route, Routes } from "react-router-dom";
import { useRecoilState } from "recoil";
import { principalState } from "../atoms/principalAtom";
import { useCallback, useEffect } from "react";
import { getPrincipalRequest } from "../apis/api/principal";
import AuthPage from "../pages/AuthPage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import { useQuery } from "react-query";
import RootSideMenuLeft from "../components/RootSideMenuLeft/RootSideMenuLeft";
import RootHeader from "../components/RootHeader/RootHeader";
import MyPage from "../pages/MyPage/MyPage";
import FullSizeLoader from "../components/FullSizeLoader/FullSizeLoader";
import PageContainer from "../components/PageContainer/PageContainer";
import PasswordEditPage from "../pages/PasswordEditPage/PasswordEditPage";
import BookManagement from "../pages/Admin/BookManagement/BookManagement";

// useQuery => GET 요청시에 사용
/*
 *  useQuery 문법
 *  첫번째 매개변수 : 배열 ["key값(전역상태)"]
 *  두번째 매개변수 : 요청메소드(async, await 형태)
 *  세번째 매개변수 : 객체 / 옵션(retry: 0, refetchOnWindowFocus: false, onSuccess: 함수, onError: 함수, enabled: true or false, ...)
 *    {
 *      retry: 0,
 *      refetchOnWindowFocus: focus,
 *      onSuccess: 함수,
 *      onError: 함수,
 *      enabled: true or false,
 *      ...
 *    }
 */ 

function AuthRoute() {
    // const [ principal, setPrincipal ] = useRecoilState(principalState);

    const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: (response) => {
        console.log("onSuccess");
        console.log(response);
      },
      onError: (error) => {
        console.log("오류");
        console.log(error);
      }
    });

    // useEffect(() => {
    //     getPrincipal();
    //   }, []);
    
    // const getPrincipal = useCallback(() => {
    //     getPrincipalRequest()
    //     .then((response) => {
    //       setPrincipal(() => {
    //         return response.data;
    //       })
    //     }).catch((error) => {
    //       console.log(error);
    //     });
    // }, []);

    return (
      <>
        <RootSideMenuLeft />
        <RootHeader />
        <PageContainer>
          {
            principalQuery.isLoading ? <FullSizeLoader size={20} /> : 
              <Routes>
                <Route path="/auth/*" element={ <AuthPage /> } />
                <Route path="/" element={ <HomePage /> } />
                <Route path="/account/mypage" element={ <MyPage /> } />
                <Route path="/account/edit/password" element={<PasswordEditPage/>} />
                <Route path="/admin/book/management" element={<BookManagement />} />
              </Routes> 
          }
        </PageContainer>
      </>
    )
}

export default AuthRoute;