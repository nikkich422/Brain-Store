const KEY = "recent_products";

export const getRecentProducts = () => {
    return JSON.parse(localStorage.getItem(KEY)) || [];
}

export const addRecentProducts = (product) => {
    let items = getRecentProducts();

    items = items.filter((p) => p._id !== product._id);
    items.unshift(product);

    items = items.slice(0, 10);
    localStorage.setItem(KEY, JSON.stringify(items));
}