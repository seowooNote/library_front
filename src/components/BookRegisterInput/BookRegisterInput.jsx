/** @jsxImportSource @emotion/react */
import * as s from "./style";

function BookRegisterInput({ value, onChange, onKeyDown, bookref, isDisabled }) {

    return (
        <input 
            css={s.inputBox}
            type="text" 
            value={value}
            onChange={onChange} 
            onKeyDown={onKeyDown} 
            ref={bookref}
            disabled={isDisabled}
        />
    )
}

export default BookRegisterInput;