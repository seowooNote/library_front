import instance from "../utils/instance";

export const getAllBookTypeRequest = async () => {
    return await instance.get("/admin/book/options/types");
}

export const getAllCategoryRequest = async () => {
    return await instance.get("/admin/book/options/categories");
}