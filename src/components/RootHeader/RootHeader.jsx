/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style";
import { HiMenu } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { menuState } from "../../atoms/menuAtom";
import { Link } from "react-router-dom";
import { principalState } from "../../atoms/principalAtom";

function RootHeader() {
  const [ show, setShow ] = useRecoilState(menuState);
  const [ principal, setPrincipal ] = useRecoilState(principalState);

  const handleOpenMenuClick = () => {
      setShow(() => true);
  }

  return (
    <div css={s.header}>
        <button css={s.menuButton} onClick={handleOpenMenuClick}>
            <HiMenu />
        </button>
        {
          !principal 
            ? 
              <Link css={s.account} to={"/auth/signin"}>
                  <FiUser />
              </Link>
            :
              <Link css={s.account} to={"/account/mypage"}>
                    <FiUser />
              </Link>
        }
    </div>
  )
}

export default RootHeader;