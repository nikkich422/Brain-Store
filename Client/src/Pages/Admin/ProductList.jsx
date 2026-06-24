import React, { useEffect, useState } from "react";
import API from "../../api/api";
import { Link } from "react-router-dom";
import { FormControl, InputLabel, MenuItem, Pagination, Select, Stack, TextField } from "@mui/material";
import { LazyLoadImage } from "react-lazy-load-image-component";
import debounce from "lodash.debounce";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subCategory: "",
    minPrice: "",
    maxPrice: "",
    inStock: true,
    sortBy: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const fetchProducts = async (pageNum = 1, customFilters = filters) => {
    try {
      setLoading(true);

      const params = new URLSearchParams({
        page: pageNum,
        ...customFilters,
      });

      const { data } = await API.get(`/api/product?${params}`);

      setProducts(data.data);
      setPage(data.pagination.page);
      setTotalPages(data.pagination.totalPages);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await API.delete(`/api/product/${id}`);
    fetchProducts(page);
  };
  const handlePageChange = (event, value) => {
    fetchProducts(value);
  };

  const fetchCategories = async () => {
    const { data } = await API.get("/api/category");

    setCategories(data.data);
  }
  
  const debouncedSearch = debounce((value) => {
    fetchProducts(1, { ...filters, search: value });
  }, 500);

  useEffect(() => {
    fetchProducts(1);
    fetchCategories();

  }, []);
  
  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [filters.category, filters.subCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedFilters = {
      ...filters,
      [name]: value,
    };

    setFilters(updatedFilters);

    if (name === "search") {
      debouncedSearch(value);
    } else {
      fetchProducts(1, updatedFilters);
    }
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;

    const selected = categories.find((c) => c.category === value);

    setFilters((prev) => ({
      ...prev,
      category: value,
      subCategory: "",
    }))

    setSubCategories(selected?.subCategories || []);
  }

  return (
    <div className="px-6 product-image-wrapper">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Products</h2>

        <Link
          to="/admin/products/add"
          className="btn-secondary font-bold"
        >
          + Add Product
        </Link>
      </div>

      {/* FILTER BAR */}
      <div className="bg-white p-4 rounded-xl shadow mb-4 grid grid-cols-6 gap-3">
        {/* Search */}
        <TextField
          label="Search"
          name="search"
          value={filters.search}
          onChange={handleChange}
          size="small"
        />

        {/* Category */}
        <TextField
          select
          label="Category"
          name="category"
          value={filters.category}
          onChange={handleCategoryChange}
          size="small"
        >
          {categories.map((cat) => (
            <MenuItem key={cat.category} value={cat.category} >
              {cat.category}
            </MenuItem>
          ))}
        </TextField>

        {/* subCategory */}
        <TextField
          select
          label="SubCategory"
          name="subCategory"
          value={filters.subCategory}
          onChange={handleChange}
          size="small"
          disabled={!filters.category}
        >
          {subCategories.map((sub) => (
            <MenuItem key={sub} value={sub}>
              {sub}
            </MenuItem>
          ))}
        </TextField>

        {/* Min Price */}
        <TextField
          label="Min Price"
          name="minPrice"
          type="number"
          value={filters.minPrice}
          onChange={handleChange}
          size="small"
        />

        {/* Max Price */}
        <TextField
          label="Max Price"
          name="maxPrice"
          type="number"
          value={filters.maxPrice}
          onChange={handleChange}
          size="small"
        />

        {/* Stock */}
        <FormControl size="small">
          <InputLabel>Stock</InputLabel>
          <Select
            name="inStock"
            value={filters.inStock}
            label="Stock"
            onChange={handleChange}
          >
            <MenuItem selected value={true}>In Stock</MenuItem>
            <MenuItem value={false}>Out of Stock</MenuItem>
          </Select>
        </FormControl>

        {/* Sort */}
        <FormControl size="small">
          <InputLabel>Sort</InputLabel>
          <Select
            name="sortBy"
            value={filters.sortBy}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value="">Default</MenuItem>
            <MenuItem value="price_asc">Price Low → High</MenuItem>
            <MenuItem value="price_desc">Price High → Low</MenuItem>
            <MenuItem value="rating">Top Rated</MenuItem>
            <MenuItem value="newest">Newest</MenuItem>
          </Select>
        </FormControl>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-xs uppercase">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Price</th>
                <th className="p-3 text-left">Stock</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-2 flex items-center gap-3">
                    <LazyLoadImage
                      src={p.image}
                      effect="blur"
                      className="w-12 h-12 object-cover rounded border"
                    />
                    <span className="font-medium">{p.title}</span>
                  </td>

                  <td className="p-2 font-semibold">₹{p.price}</td>

                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        p.stock_count > 0
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {p.stock_count > 0 ? "In Stock" : "Out"}
                    </span>
                  </td>

                  <td className="p-2 text-center">
                    <div className="flex justify-center gap-2">
                      <Link
                        to={`/admin/products/edit/${p._id}`}
                        className="btn-primary font-bold"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteProduct(p._id)}
                        className="btn-secondary font-bold"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* EMPTY */}
        {!loading && products.length === 0 && (
          <div className="p-6 text-center text-gray-500">No products found</div>
        )}
      </div>

      {/* PAGINATION */}
      <Stack alignItems="center" className="mt-6">
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
        />
      </Stack>
    </div>
  );
};

export default ProductList;
