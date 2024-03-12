/** @jsxImportSource @emotion/react */
import { HiMenu } from "react-icons/hi";
import { Link } from 'react-router-dom'
import * as s from "./style";
import { useRecoilState } from "recoil";
import { menuState } from "../../atoms/menuAtom";

function RootSideMenuLeft() {
    const [ show, setShow ] = useRecoilState(menuState);

    const handleCloseMenuClick = () => {
        setShow(() => false);
    }

    return (
        <div css={s.layout(show)}>
            <div css={s.header}>
                <button css={s.menuButton} onClick={handleCloseMenuClick}>
                    <HiMenu/>
                </button>
            </div>
            <div css={s.profile}></div>
            <div css={s.menuList}>
                <Link css={s.menuLink}>
                    도서 검색
                </Link>
            </div>
        </div>
    )
}

export default RootSideMenuLeft;