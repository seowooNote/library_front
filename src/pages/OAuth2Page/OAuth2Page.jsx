/** @jsxImportSource @emotion/react */
import { Link, useSearchParams } from "react-router-dom";
import * as s from "./style";

function OAuth2Page() {
    
    const [ searchParam ] = useSearchParams();
    const name = searchParam.get("name");
    const provider = searchParam.get("provider");

    return (
        <div css={s.header}>
            <div>
                <h1>계정 통합</h1>
                <button css={s.button}><Link to={`/auth/oauth2/merge?name=${name}&provider=${provider}`}>계정 통합하기</Link></button>
            </div>
            <div>
                <h1>회원가입</h1>
                <button css={s.button}><Link to={`/auth/oauth2/signup?name=${name}&provider=${provider}`}  >회원가입하기</Link></button>
            </div>
            
        </div>
    )
}

export default OAuth2Page;