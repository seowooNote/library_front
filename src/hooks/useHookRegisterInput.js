import { useState } from "react"

export const useBookRegiseterInput = (enterFn, ref) => {
    const [ value, setValue ] = useState("");

    const handleOnChange = (e) => {
        if(!!e.target) {
            setValue(() => e.target.value); // input
        } else {
            setValue(() => e.value); // select
        }
    }

    const handleOnKeyDown = (e) => {
        if(e.keyCode === 13) {
            enterFn(ref);
        }
    }

    return { value, handleOnChange, handleOnKeyDown, setValue };
}