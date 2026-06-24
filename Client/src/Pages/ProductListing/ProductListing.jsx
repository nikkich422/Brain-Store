import React, { useState, useEffect } from "react";
import {
  FormControlLabel,
  Checkbox,
  FormGroup,
  Rating,
  Button,
  Menu,
  MenuItem,
  Stack,
  Pagination,
} from "@mui/material";
import { Collapse } from "react-collapse";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import API from "../../api/api";
import ProductListingCard from "../../Components/ProductListingCard";
import { useQuery } from "@tanstack/react-query";

const ProductListing = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showCategory, setShowCategory] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const search = searchParams.get("search") || "";

  const [filters, setFilters] = useState({
    subCategory: [],
    inStock: null,
    rating: null,
    minPrice: 0,
    maxPrice: 10000,
    sortBy: "rating",
    page: 1,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      page: 1,
    }));
  }, [search])

  // URL → STATE (initial load)
  useEffect(() => {
    const subCategory = searchParams.get("subCategory");

    setFilters((prev) => ({
      ...prev,
      subCategory: subCategory ? subCategory.split(",") : [],
      page: Number(searchParams.get("page")) || 1,
    }));
  }, []);

  // STATE → URL sync
  useEffect(() => {
    setSearchParams((prev) => {
      const params = Object.fromEntries(prev.entries());

      params.subCategory = filters.subCategory.join(",");
      params.page = filters.page;

      if(filters.rating) params.rating = filters.rating;
      else delete params.rating;

      if(filters.inStock !== null) params.inStock = filters.inStock;
      else delete params.inStock;

      return params;
    });
  }, [filters.subCategory, filters.page, filters.rating, filters.inStock]);


  const fetchProducts = async () => {
    const params = new URLSearchParams();

    if (filters.subCategory.length)
      params.append("subCategory", filters.subCategory.join(","));

    if (filters.inStock !== null)
      params.append("inStock", filters.inStock);

    if (filters.rating) params.append("rating", filters.rating);
    if (search) params.append("search", search);

    params.append("minPrice", filters.minPrice);
    params.append("maxPrice", filters.maxPrice);
    params.append("sortBy", filters.sortBy);
    params.append("page", filters.page);

    const { data } = await API.get(`/api/product?${params}`);
    return data;
  };

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["products", filters, search],
    queryFn: () => fetchProducts(filters),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  })

  const products = data?.data || [];
  const totalPages = data?.totalPages || [];
  const totalProducts = data?.totalProducts || 0;

  // handlers
  const handleSubCategoryChange = (value) => {
    setFilters((prev) => {
      const exists = prev.subCategory.includes(value);

      return {
        ...prev,
        subCategory: exists
          ? prev.subCategory.filter((c) => c !== value)
          : [...prev.subCategory, value],
        page: 1,
      };
    });
  };

  const handleRating = (value) => {
    setFilters((prev) => ({ ...prev, rating: value, page: 1 }));
  };

  const handlePriceChange = ([min, max]) => {
    setFilters((prev) => ({
      ...prev,
      minPrice: min,
      maxPrice: max,
      page: 1,
    }));
  };
  
  const handleSort = (value) => {
    setFilters((prev) => ({ ...prev, sortBy: value }));
    updateParams({
      sortBy: value,
    });
    setAnchorEl(null);
  };
  
  const handlePageChange = (e, value) => {
    setFilters((prev) => ({ ...prev, page: value }));
  };
  
  const handleStock = (value) => {
    setFilters((prev) => ({
      ...prev,
      inStock: prev.inStock === value ? null : value,
      page: 1,
    }));
  };

  const sortLabelMap = {
    price_asc: "Price Low → High",
    price_desc: "Price High → Low",
    rating: "Rating",
    newest: "Newest",
  };

  const categories = [
    { title: "Women Dresses", subCategory: "women_dresses" },
    { title: "Men Pants", subCategory: "men_pants" },
    { title: "Men Sweatshirt", subCategory: "men_sweatshirt" },
    { title: "Women Sarees", subCategory: "women_saree" },
    { title: "Womens Trousers", subCategory: "women_trousers" },
    { title: "Mens Flipflops", subCategory: "men_flipflops" },
    { title: "Mens Smartwatch", subCategory: "mens_smartwatch" },
    { title: "Men Watches", subCategory: "men_watch" },
    { title: "Health & Nutritions", subCategory: "health_and_nutritions" },
    { title: "Kids Dresses", subCategory: "kids_dresses" },
    { title: "Women Jewellery", subCategory: "women_jewellery" },
    { title: "Men Shoes", subCategory: "men_shoes" },
    { title: "Bedsheets", subCategory: "bedsheets" },
    { title: "Sofa", subCategory: "sofa" },
    { title: "Remote Control Toys", subCategory: "remote_control_toys" },
    { title: "Foods", subCategory: "gourmet_foods" },
  ];

  const ProductCardSkeleton = () => {
    return (
      <div className="w-full sm:w-56 border border-gray-200 rounded-xl p-3 bg-white">
        <div className="animate-pulse">
          {/* Image */}
          <div className="h-44 w-full bg-gray-200 rounded-md"></div>
  
          {/* Title */}
          <div className="mt-3 space-y-2">
            <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
  
          {/* Rating */}
          <div className="mt-2 flex items-center gap-2">
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
            <div className="h-3 w-10 bg-gray-200 rounded"></div>
          </div>
  
          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <div className="h-4 w-16 bg-gray-300 rounded"></div>
            <div className="h-3 w-12 bg-gray-200 rounded"></div>
            <div className="h-3 w-10 bg-gray-200 rounded"></div>
          </div>
  
          {/* Footer */}
          <div className="mt-3 h-3 w-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex container gap-4 pt-2">
      {/* SIDEBAR */}
      <div className="w-[20%] pr-5 border-r border-gray-300">
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => setShowCategory(!showCategory)}
        >
          <h3 className="font-bold">Category</h3>
          {showCategory ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>

        <Collapse isOpened={showCategory} className="max-h-50 overflow-auto">
          <FormGroup>
            {categories.map((cat) => (
              <FormControlLabel
                key={cat.subCategory}
                control={
                  <Checkbox
                    checked={filters.subCategory.includes(cat.subCategory)}
                    onChange={() => handleSubCategoryChange(cat.subCategory)}
                  />
                }
                label={cat.title}
              />
            ))}
          </FormGroup>
        </Collapse>

        {/* STOCK */}
        <div className="mt-4">
          <h3 className="font-bold">Availability</h3>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.inStock === true}
                  onChange={() => handleStock(true)}
                />
              }
              label="In Stock"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={filters.inStock === false}
                  onChange={() => handleStock(false)}
                />
              }
              label="Out of Stock"
            />
          </FormGroup>
        </div>

        {/* PRICE FILTER */}
        <div className="mt-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold">Price Range</h3>

            <span className="text-sm font-medium text-[#e06213]">
              ₹{filters.minPrice} - ₹{filters.maxPrice}
            </span>
          </div>

          <RangeSlider
            min={0}
            max={10000}
            value={[filters.minPrice, filters.maxPrice]}
            onInput={handlePriceChange}
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Min ₹0</span>
            <span>Max ₹10,000</span>
          </div>
        </div>

        {/* RATING */}
        <div className="mt-5">
          <h3 className="font-bold mb-3">Customer Rating</h3>

          <div className="flex flex-col gap-2">
            {[5, 4, 3, 2, 1].map((r) => (
              <button
                key={r}
                onClick={() => handleRating(r)}
                className={`flex items-center gap-2 px-2 py-1 rounded-md border transition cursor-pointer
                hover:bg-gray-50 hover:border-gray-300
                ${
                  filters.rating === r
                    ? "border-[#ff9858] bg-[#fae9df] hover:bg-[#ffddca]! hover:border-[#ff9858]!"
                    : "border-gray-200"
                }
              `}
              >
                <Rating value={r} readOnly size="small" />

                <span className="text-sm text-gray-600">& Up</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="w-[80%]">
        <div className="flex justify-between bg-gray-200 py-2 px-4 rounded items-center">
          <p className="font-semibold">{totalProducts} Products</p>

          <Button
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className="text-[#e06213]! border!"
          >
            {sortLabelMap[filters.sortBy]}
          </Button>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              selected={filters.sortBy === "price_asc"}
              onClick={() => handleSort("price_asc")}
            >
              Price Low → High
            </MenuItem>
            <MenuItem
              selected={filters.sortBy === "price_desc"}
              onClick={() => handleSort("price_desc")}
            >
              Price High → Low
            </MenuItem>
            <MenuItem
              selected={filters.sortBy === "rating"}
              onClick={() => handleSort("rating")}
            >
              Rating
            </MenuItem>
            <MenuItem
              selected={filters.sortBy === "newest"}
              onClick={() => handleSort("newest")}
            >
              Newest
            </MenuItem>
          </Menu>
        </div>

        {search && (
          <p className="mb-2! mt-2! text-gray-600">
            Showing results for: <span className="font-semibold">"{search}"</span>
          </p>
        )}

        <div className="flex flex-wrap gap-2 py-3">
          {isLoading
            ? [...Array(10)].map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((item) => (
                <ProductListingCard
                  key={item._id}
                  item={item}
                  loading={isFetching || isLoading}
                />
              ))}

          {/* Smooth background loading (pagination / filters) */}
          {isFetching &&
            !isLoading &&
            [...Array(4)].map((_, i) => (
              <ProductCardSkeleton key={`fetch-${i}`} />
            ))}
        </div>

        <Stack alignItems="center">
          <Pagination
            count={totalPages}
            page={filters.page}
            onChange={handlePageChange}
          />
        </Stack>
      </div>
    </div>
  );
};

export default ProductListing;