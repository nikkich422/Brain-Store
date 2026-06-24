import { useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";
import { Avatar, Button, Rating } from "@mui/material";
import { FaCartPlus } from "react-icons/fa";
import { IoGitCompareOutline } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import QtyBox from "../../Components/QtyBox/QtyBox";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartLocal,
  closeCartDrawer,
  openCartDrawer,
  removeFromCartLocal,
  updateCartItems,
  updateQtyLocal,
} from "../../redux/slice/cartSlice";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import API from "../../api/api";
import ProductListingCard from "../../Components/ProductListingCard";
import { addRecentProducts, getRecentProducts } from "../../Utils/recentlyViewed";
import RecentlyViewedList from "../../Components/RecentlyViewedList";
import VerifiedIcon from "@mui/icons-material/Verified";

const ProductDetails = () => {
  const [index, setIndex] = useState(0);
  const [product, setProduct] = useState(null);
  const [reletedProducts, setReletedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const { slug } = useParams();
  const cartItems = useSelector((store) => store.cart.cartItems);
  const recentlyViewedProducts = getRecentProducts();
  // Skeleton
  const ProductDetailsSkeleton = () => {
    return (
      <div className="container py-6 flex gap-6">
        <div className="w-[40%]">
          <div className="w-full h-100 bg-gray-200 animate-pulse rounded-xl"></div>
        </div>

        <div className="w-[60%] space-y-4">
          <div className="h-8 bg-gray-200 animate-pulse rounded w-3/4"></div>
          <div className="h-5 bg-gray-200 animate-pulse rounded w-1/2"></div>

          <div className="flex gap-4">
            <div className="h-8 w-24 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-8 w-20 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="h-20 bg-gray-200 animate-pulse rounded"></div>

          <div className="flex gap-2">
            <div className="h-10 w-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-12 bg-gray-200 animate-pulse rounded"></div>
            <div className="h-10 w-12 bg-gray-200 animate-pulse rounded"></div>
          </div>

          <div className="h-10 w-40 bg-gray-200 animate-pulse rounded"></div>
        </div>
      </div>
    );
  };

  const existingItem = cartItems?.find(
    (i) =>
      (i?.productId?._id === product?._id || i?.productId === product?._id) &&
      i.size === selectedSize
  );

  const prevQty = existingItem ? existingItem.quantity : 0;
  const tabs = [
    { label: "Description", value: 0 },
    { label: "Product Details", value: 1 },
    { label: `Reviews (${reviews.length})`, value: 2 },
  ];

  const fetchData = async () => {
    try {
      const jsonData = await API.get(`/api/product/slug/${slug}`);
      //console.log(jsonData);

      setProduct(jsonData.data.data);
      setReletedProducts(jsonData.data.reletedProducts);
      console.log("Releted Product: ", jsonData.data.reletedProducts);
    } catch (error) {
      toast.error("Something went to fetch product");
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await API.get(`/api/review/${product._id}`);
      setReviews(data.reviews);

    } catch (error) {
      toast.error("Failed to fetch Reviews");
    }
  }

  useEffect(() => {
    fetchData();
  }, [slug]);

  useEffect(() => {
    if (product) {
      addRecentProducts(product);
    }
    if(product?._id){
      fetchReviews();
    }
  }, [product]);

  async function handleAddToCart() {
    if (product?.size && product?.size.length > 0 && selectedSize === null) {
      return toast.error("Please Select Size first");
    }

    const item = {
      productId: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      quantity: quantity + prevQty,
      size: selectedSize,
    };

    // console.log("size: ", selectedSize);
    dispatch(addToCartLocal(item));

    try {
      toast.success("Item Added To cart");
      dispatch(openCartDrawer());
      await dispatch(updateCartItems(item)).unwrap();
    } catch (error) {
      // rollback product if API call fails

      if (prevQty === 0) {
        dispatch(
          removeFromCartLocal({
            productId: item.productId,
            size: item.size,
          })
        );
      } else {
        dispatch(
          updateQtyLocal({
            productId: item.productId,
            size: item.size,
            quantity: prevQty,
          })
        );
      }
      dispatch(closeCartDrawer());
      toast.error("Failed to add item");
    }

    setQuantity(1);
  }

  const submitReview = async () => {
    try {
      await API.post(`/api/review`, {
        productId: product?._id,
        rating,
        comment,
      })

      toast.success("Review added");
      setComment("");

      fetchReviews();

    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to Submit Review");
    }
  }

  if (!product) return <ProductDetailsSkeleton />;

  return (
    <>
      <div className="container py-4 flex gap-4 justify-between">
        {/* LEFT SIDE (IMAGE) */}
        <div className="w-[40%] flex gap-4">
          <div className="w-[80%] h-100 m-auto">
            <InnerImageZoom src={product?.image} zoomType="hover" />
          </div>
        </div>

        {/* RIGHT SIDE (DETAILS) */}
        <div className="w-[60%] px-6 py-2">
          {/* Title */}
          <h2 className="font-bold text-3xl mb-4!">{product?.title}</h2>

          {/* Brand + Rating */}
          <div className="flex items-center gap-2 mb-2! text-[14px]">
            {product?.brand && (
              <p className="font-medium flex gap-2">
                <span className="text-gray-500">Brand:</span> {product?.brand}
              </p>
            )}

            <Rating value={product?.rating} readOnly />

            <p>Review ({product?.review_count})</p>
          </div>

          {/* Price + Stock */}
          <div className="flex gap-5 mt-4! items-center">
            <span className="text-gray-400 line-through text-xl">
              ₹{product?.original_price.toLocaleString("en-IN")}
            </span>

            <span className="text-red-600 text-2xl font-medium">
              ₹{product?.price.toLocaleString("en-IN")}
            </span>

            <span className="text-green-600 text-sm">{product?.discount}</span>

            <div className="text-[13px] flex gap-2">
              Available:
              <span
                className={`font-bold ${
                  product?.in_stock ? "text-green-600" : "text-red-500"
                }`}
              >
                {product?.in_stock
                  ? `${product?.stock_count} items`
                  : "Out of Stock"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="mt-6! text-gray-600 text-[15px]">
            {product?.description ||
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut totam. Blanditiis nostrum recusandae asperiores eaque nostrum fugit dolorum repudiandae nesciunt voluptatibus placeat ratione aliquid, ducimus, nulla dolores doloremque officia molestiae est accusamus sit! Atque, ipsam quaerat! Exercitationem consequatur nam quas pariatur aspernatur? Nemo modi, dolor repellendus corporis inventore similique dolorem voluptas sequi quasi fugit ex fuga exercitationem ratione cumque, eius omnis assumenda maiores facere quae. Doloribus voluptates officiis quaerat harum, explicabo numquam!..."}
          </div>

          {/* Sizes */}
          {product?.size && product?.size.length > 0 && (
            <div className="flex gap-2 items-center text-[14px] font-medium mt-4!">
              <span className="inline-block mr-2!">Size</span>

              {product?.size.map((s, i) => (
                <Button
                  key={i}
                  onClick={() => setSelectedSize(s)}
                  className={`min-w-10! border! border-gray-300! text-[14px] ${
                    selectedSize === s && "bg-[#e06213]! text-white!"
                  }`}
                >
                  {s}
                </Button>
              ))}
            </div>
          )}

          {/* Delivery */}
          <span className="font-medium text-gray-400 text-[13px] inline-block mt-2! mb-3!">
            Free Shipping (Est. Delivery Time 2-3 days)
          </span>

          {/* Cart */}
          <div className="flex gap-3 items-center">
            <QtyBox quantity={quantity} setQuantity={setQuantity} />

            <button
              className="btn btn-primary flex gap-2 font-medium items-center"
              onClick={() => handleAddToCart(product)}
              disabled={!product?.in_stock}
            >
              <FaCartPlus />
              {product?.in_stock ? "ADD TO CART" : "OUT OF STOCK"}
            </button>
          </div>

          {/* Wishlist / Compare */}
          <div className="flex gap-4 items-center mt-6!">
            <span className="font-medium text-[15px] flex items-center gap-1">
              <IoMdHeartEmpty className="text-[20px]" />
              Add to Wishlist
            </span>

            <span className="font-medium text-[15px] flex items-center gap-1">
              <IoGitCompareOutline className="text-[20px]" />
              Add to Compare
            </span>
          </div>
        </div>
      </div>
      <div className="container mt-2!">
        <div className="border-b border-gray-200 mb-4">
          <div className="flex gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setIndex(tab.value)}
                className={`relative pb-2 text-md cursor-pointer font-bold transition ${
                  index === tab.value
                    ? "text-[#e06213]"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {tab.label}

                {/* Active underline animation */}
                {index === tab.value && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-[#e06213] rounded-full"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="border border-gray-300 shadow-md rounded-xl px-5 py-4">
          {index == 0 && (
            <div>
              <p className="text-gray-500 my-3!">
                The best is yet to come! Give your walls a voice with a framed
                poster. This aesthethic, optimistic poster will look great in
                your desk or in an open-space office. Painted wooden frame with
                passe-partout for more depth.
              </p>
              <h3 className="font-bold my-3!">Lightweight Design</h3>
              <p className="text-gray-500 my-3!">
                Designed with a super light geometric case, the Versa family
                watches are slim, casual and comfortable enough to wear all day
                and night. Switch up your look with classic, leather, metal and
                woven accessory bands. Ut elit tellus, luctus nec ullamcorper
                mattis, pulvinar dapibus leo.
              </p>
              <h3 className="font-bold my-3!">Free Shipping & Return</h3>
              <p className="text-gray-500 my-3!">
                We offer free shipping for products on ordens above 50$ and
                offer free delivery for all orders in US
              </p>
              <h3 className="font-bold my-3!">Money Back Guarantee</h3>
              <p className="text-gray-500 my-3!">
                We guarantee our products and you could get back all of your
                money anytime you want in 30 days.
              </p>
              <h3 className="font-bold my-3!">Online Support</h3>
              <p className="text-gray-500 my-3!">
                You will get 24 hour support with this purchase product and you
                can return it within 30 days for an exchange.
              </p>
            </div>
          )}
          {index == 1 && (
            <div class="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-gray-200">
              <table class="w-full text-sm text-left rtl:text-right text-body">
                <thead class="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-gray-200">
                  <tr>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Product name
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Color
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Category
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Price
                    </th>
                    <th scope="col" class="px-6 py-3 font-medium">
                      Stock
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="bg-neutral-primary border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      Apple MacBook Pro 17"
                    </th>
                    <td class="px-6 py-4">Silver</td>
                    <td class="px-6 py-4">Laptop</td>
                    <td class="px-6 py-4">$2999</td>
                    <td class="px-6 py-4">231</td>
                  </tr>
                  <tr class="bg-neutral-primary border-b border-gray-200">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      Microsoft Surface Pro
                    </th>
                    <td class="px-6 py-4">White</td>
                    <td class="px-6 py-4">Laptop PC</td>
                    <td class="px-6 py-4">$1999</td>
                    <td class="px-6 py-4">423</td>
                  </tr>
                  <tr class="bg-neutral-primary">
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      Magic Mouse 2
                    </th>
                    <td class="px-6 py-4">Black</td>
                    <td class="px-6 py-4">Accessories</td>
                    <td class="px-6 py-4">$99</td>
                    <td class="px-6 py-4">121</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {index == 2 && (
            <div className="bg-white rounded-3xl p-6">
              <h2 className="text-2xl font-black mb-6">Customer Reviews</h2>

              {/* ADD REVIEW */}
              <div className="bg-gray-50 rounded-2xl p-5 mb-8">
                <h3 className="font-bold text-lg mb-2">
                  Write a Review
                </h3>

                <Rating
                  name="product-rating"
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  size="large"
                />

                <TextField
                  label="Write your Review"
                  multiline
                  rows={4}
                  className="mt-4!"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                />

                <button
                  onClick={submitReview}
                  className="mt-4 btn-primary font-bold px-6! py-2!"
                >
                  Submit Review
                </button>
              </div>

              {/* REVIEW LIST */}

              <div className="space-y-4">
                {reviews?.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white border border-gray-200 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    {/* TOP */}
                    <div className="flex items-start justify-between">
                      {/* LEFT */}
                      <div className="flex gap-3">
                        {/* AVATAR */}
                        <Avatar
                          src={review.userId?.avatar}
                          alt={review.userId?.name}
                          sx={{
                            width: 48,
                            height: 48,
                          }}
                        >
                          {review.userId?.name?.charAt(0)}
                        </Avatar>

                        {/* USER INFO */}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-800">
                              {review.userId?.name}
                            </h3>

                            <span className="flex items-center gap-1 text-green-600 text-xs font-semibold bg-green-50 px-2 py-1 rounded-full">
                              <VerifiedIcon sx={{ fontSize: 14 }} />
                              Verified Purchase
                            </span>
                          </div>

                          {/* DATE */}
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(review.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* RATING */}
                    <div className="mt-4">
                      <Rating
                        value={review.rating}
                        precision={0.5}
                        readOnly
                      />
                    </div>

                    {/* COMMENT */}
                    <p className="mt-3 text-gray-700 leading-relaxed text-sm">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {reletedProducts?.length > 0 && (
        <div className="container mt-10!">
          <h2 className="text-xl font-semibold mb-4">Related Products</h2>

          <div className="flex flex-wrap gap-4">
            {reletedProducts.map((item) => (
              <div key={item._id} className="relative">
                <ProductListingCard item={item} />

                {!item.in_stock && (
                  <div className="absolute inset-0 bg-white/60 flex items-center justify-center rounded-xl">
                    <span className="text-red-600 font-semibold text-sm">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {recentlyViewedProducts && recentlyViewedProducts.length > 0 && (
        <div className="container mt-10!">
          <h2 className="text-xl font-semibold mb-4">Recently Viewed</h2>
          <RecentlyViewedList />
        </div>
      )}
    </>
  );
};

export default ProductDetails;
