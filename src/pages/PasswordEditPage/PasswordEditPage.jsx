/** @jsxImportSource @emotion/react */
import { useMutation } from "react-query";
import AuthPageInput from "../../components/AuthPageInput/AuthPageInput";
import { useAuthCheck } from "../../hooks/useAuthCheck";
import { useInput } from "../../hooks/useInput";
import * as s from "./style";
import { editPasswordRequest } from "../../apis/api/editPassword";
import { useNavigate } from "react-router-dom";

function PasswordEditPage() {
  useAuthCheck();
  const navigate = useNavigate();
  const [ oldPassword, handleOldPassword, oldMessage, setOld, setOldMessage ] = useInput("oldPassword");
  const [ newPassword, handleNewPassword, newMessage, setNew, setNewMessage ] = useInput("newPassword");
  const [ newPasswordCheck, handleNewPasswordCheck, newCheckMessage, setNewCheck, setNewCheckMessage ] = useInput("newPasswordCheck");

  const editPasswordMutation = useMutation({
    mutationKey: "editPasswordMutation",
    mutationFn: editPasswordRequest,
    onSuccess: (response) => {
      alert("비밀번호를 정상적으로 변경하였습니다.\n다시 로그인 하세요.");
      localStorage.removeItem("AccessToken");
      window.location.replace("/auth/signin");
    },
    onError: (error) => {
      if(error.response.status === 400) {
        const errorMap = error.response.data;
        const errorEntries = Object.entries(errorMap);
        setOldMessage(null);
        setNewMessage(null);
        setNewCheckMessage(null);
        for(let [ k, v ] of errorEntries) {
          const message = {
            type: "error",
            text: v
          }
          if(k === "oldPassword") {
            setOldMessage(() => { return message });
          }
          if(k === "newPassword") {
            setNewMessage(() => { return message });
          }
          if(k === "newPasswordCheck") {
            setNewCheckMessage(() => { return message });
          }
        }
      };
    }
  });

  const handleEditSubmitClick = () => {
    editPasswordMutation.mutate({
      oldPassword,
      newPassword,
      newPasswordCheck
    });
  };

  return (
    <div css={s.header}>
      <h1>비밀번호 변경</h1>
      <AuthPageInput type={"password"} value={oldPassword} onChange={handleOldPassword} placeholder={"현재 비밀번호를 입력하세요."} message={oldMessage} />
      <AuthPageInput type={"password"} value={newPassword} onChange={handleNewPassword} placeholder={"새로운 비밀번호를 입력하세요."} message={newMessage} />
      <AuthPageInput type={"password"} value={newPasswordCheck} onChange={handleNewPasswordCheck} placeholder={"새로운 비밀번호를 확인하세요."} message={newCheckMessage} />
      <button onClick={handleEditSubmitClick}>확인</button>
    </div>
  )
}

export default PasswordEditPage;