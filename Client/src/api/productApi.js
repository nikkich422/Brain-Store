import API from "./api"

export const fetchProductsByCategory = async (type) => {
    const res = await API.get(`/api/product?inStock=true&category=${type}`);
    return res.data.data;
}