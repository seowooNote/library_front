/** @jsxImportSource @emotion/react */
import Select from "react-select";
import BookRegisterInput from "../../../components/BookRegisterInput/BookRegisterInput";
import * as s from "./style";
import { useMutation, useQuery } from "react-query";
import { getAllBookTypeRequest, getAllCategoryRequest } from "../../../apis/api/options";
import { useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useBookRegiseterInput } from "../../../hooks/useHookRegisterInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../apis/firebase/config/firebaseConfig";
import { v4 as uuid } from "uuid";
import { upload } from "@testing-library/user-event/dist/upload";
import RightTopButton from "../../../components/RightTopButton/RightTopButton";
import { registerBook } from "../../../apis/api/bookApi";

function BookManagement() {
    const [ bookTypeOptions, setBookTypeOptions ] = useState([]);
    const [ categoryOptions, setCategoryOptions ] = useState([]);
    const fileRef = useRef();
    const inputRefs = [
        useRef(), // 0 bookId
        useRef(), // 1 isbn
        useRef(), // 2 도서형식
        useRef(), // 3 카테고리
        useRef(), // 4 도서명
        useRef(), // 5 저자명
        useRef(), // 6 출판사
        useRef()  // 7 URL
    ];

    const bookTypeQuery = useQuery(
        ["bookTypeQuery"], 
        getAllBookTypeRequest,
        {
            onSuccess: (response) => {
                setBookTypeOptions(() => response.data.map((bookType) => {
                    return {
                        value : bookType.bookTypeId,
                        label : bookType.bookTypeName
                    }
                }));
            },
            onError: (error) => {
                console.log(error);
            },
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const categoryQuery = useQuery(
        ["categoryQuery"], 
        getAllCategoryRequest,
        {
            onSuccess: (response) => {
                setCategoryOptions(() => response.data.map((category) => {
                    return {
                        value: category.categoryId,
                        label: category.categoryName
                    }
                }));
            },
            onError: (error) => {
                console.log(error);
            },
            retry: 0,
            refetchOnWindowFocus: false
        }
    );

    const registerBookMutation = useMutation({
        mutationKey: "registerBookMutation",
        mutationFn: registerBook,
        onSuccess: (response) => {

        },
        onError: (error) => {

        }
    });

    
    const nextInput = (ref) => {
        ref.current.focus();
    }

    const submit = () => {
        registerBookMutation.mutate({
            isbn: isbn.value,
            bookTypeId: bookTypeId.value,
            categoryId: categoryId.value,
            bookName: bookName.value,
            authorName: authorName.value,
            publisherName: publisher.value,
            coverImgUrl: imgUrl.value
        });

        console.log([
            bookId.value, 
            isbn.value, 
            bookTypeId.value, 
            categoryId.value, 
            bookName.value, 
            authorName.value, 
            publisher.value, 
            imgUrl.value
        ]);
    }

    const bookId = useBookRegiseterInput(nextInput, inputRefs[1]);
    const isbn = useBookRegiseterInput(nextInput, inputRefs[2]);
    const bookTypeId = useBookRegiseterInput(nextInput, inputRefs[3]);
    const categoryId = useBookRegiseterInput(nextInput, inputRefs[4]);
    const bookName = useBookRegiseterInput(nextInput, inputRefs[5]);
    const authorName = useBookRegiseterInput(nextInput, inputRefs[6]);
    const publisher = useBookRegiseterInput(nextInput, inputRefs[7]);
    const imgUrl = useBookRegiseterInput(submit);

    


    const selectStyle = {
        control: (baseStyles) => ({
            ...baseStyles,
            borderRadius: "0px",
            border: "none",
            outline: "none",
            boxShadow: "none"
        })
    }

    const handleFileChange = (e) => {
        
        const files = Array.from(e.target.files);
        
        if(files.length === 0) {
            e.target.value = "";
            return;
        }
        
        if(!window.confirm("파일을 업로드 하시겠습니까?")) {
            e.target.value = "";
            return;
        }

        const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`); // firebase 경로
        const uploadTask = uploadBytesResumable(storageRef, files[0]);

        uploadTask.on(
            "state_changed",
            snapshot => {},
            error => {},
            () => {
                alert("업로드를 완료하셨습니다.");
                getDownloadURL(storageRef)
                .then((url) => {
                    imgUrl.setValue(() => url);
                });
            }
        )
    }

    return (
        <div css={s.layout}>
            <div css={s.header}>
                <h1>도서 관리</h1>
                <RightTopButton onClick={submit}>확인</RightTopButton>
            </div>
            <div css={s.topLayout}>
                <table css={s.registerTable}>
                    <tbody>
                        <tr>
                            <th css={s.registerTh}>도서코드</th>
                            <td>
                                <BookRegisterInput 
                                    value={bookId.value}
                                    bookref={inputRefs[0]}
                                    onChange={bookId.handleOnChange}
                                    onKeyDown={bookId.handleOnKeyDown}
                                />
                            </td>
                            <th css={s.registerTh}>ISBM</th>
                            <td>
                                <BookRegisterInput
                                    value={isbn.value}
                                    bookref={inputRefs[1]}
                                    onChange={isbn.handleOnChange}
                                    onKeyDown={isbn.handleOnKeyDown}
                                />
                            </td>
                            <td rowSpan={5} css={s.preview}>
                                <div css={s.imageBox}>
                                    <img src={!imgUrl.value 
                                        ? "https://media.istockphoto.com/id/1159947597/vector/add-photos-concept-line-icon-simple-element-illustration.jpg?s=612x612&w=0&k=20&c=eU2aJxlWFKDle1-NS8KBOzRYrEgSSJ4QVKorAmp467M=" 
                                        : imgUrl.value} 
                                    alt="" />
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>도서형식</th>
                            <td>
                                <Select
                                    styles={selectStyle}
                                    options={bookTypeOptions}
                                    ref={inputRefs[2]}
                                    onChange={bookTypeId.handleOnChange}
                                    onKeyDown={bookTypeId.handleOnKeyDown}
                                />
                            </td>
                            <th css={s.registerTh}>카테고리</th>
                            <td>
                                <Select 
                                    styles={selectStyle}
                                    options={categoryOptions}
                                    ref={inputRefs[3]}
                                    onChange={categoryId.handleOnChange}
                                    onKeyDown={categoryId.handleOnKeyDown}
                                />
                                    
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>도서명</th>
                            <td colSpan={3}>
                                <BookRegisterInput
                                    value={bookName.value}
                                    bookref={inputRefs[4]}
                                    onChange={bookName.handleOnChange}
                                    onKeyDown={bookName.handleOnKeyDown}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>저자명</th>
                            <td>
                                <BookRegisterInput
                                    value={authorName.value}
                                    bookref={inputRefs[5]}
                                    onChange={authorName.handleOnChange}
                                    onKeyDown={authorName.handleOnKeyDown}
                                />
                            </td>
                            <th css={s.registerTh}>출판사</th>
                            <td>
                                <BookRegisterInput
                                    value={publisher.value}
                                    bookref={inputRefs[6]}
                                    onChange={publisher.handleOnChange}
                                    onKeyDown={publisher.handleOnKeyDown}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th css={s.registerTh}>표지URL</th>
                            <td colSpan={3}>
                                <div css={s.imgUrl}>
                                    <span css={s.imgUrlBox}>
                                        <BookRegisterInput
                                            value={imgUrl.value}
                                            bookref={inputRefs[7]}
                                            onChange={imgUrl.handleOnChange}
                                            onKeyDown={imgUrl.handleOnKeyDown}
                                        />
                                    </span>
                                    <input type="file" style={{display: "none"}} onChange={handleFileChange} ref={fileRef} />
                                    <button css={s.imgAddButton} onClick={() => fileRef.current.click()}>
                                        <CiSquarePlus/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div></div>
            </div>
        </div>
    )
}

export default BookManagement;