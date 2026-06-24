import { styled } from "@mui/material/styles";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { FaSearch } from "react-icons/fa";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { IoGitCompareOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosArrowDown } from "react-icons/io";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import NestedMenu from "../NestedMenu/NestedMenu";
import { useDispatch, useSelector } from "react-redux";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import { FaRegUser } from "react-icons/fa";
import { logoutUser } from "../../redux/slice/authSlice";
import toast from "react-hot-toast";
import { toggleCartDrawer } from "../../redux/slice/cartSlice";
import debounce from "lodash.debounce";
import API from "../../api/api";
import { AnimatePresence, motion } from "framer-motion";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -11px;
    right: -2px;
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState({ suggestions: [], products: [] });
  const [showDropdown, setShowDropdown] = useState(false);

  const recent = JSON.parse(localStorage.getItem("recentSearch")) || [];

  const user = useSelector((state) => state?.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state?.cart?.cartItems);
  const wishlistItems = useSelector((state) => state?.wishlist?.items);
  const compareItems = useSelector((state) => state?.compare?.items);

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const toggleDrawer = (newOpen) => () => setOpen(newOpen);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation">
      <NestedMenu items={[]} toggleDrawer={toggleDrawer} />
    </Box>
  );

  const [openProfile, setOpenProfile] = useState(false);
  const anchorRefProfile = useRef(null);

  const handleCloseProfile = (event) => {
    if (anchorRefProfile.current && anchorRefProfile.current.contains(event.target)) return;
    setOpenProfile(false);
  };
  const handleToggleProfile = () => setOpenProfile((prev) => !prev);

  function handleListKeyDownProfile(event) {
    if (event.key === "Tab") { event.preventDefault(); setOpenProfile(false); }
    else if (event.key === "Escape") setOpenProfile(false);
  }

  const prevOpen = useRef(openProfile);
  useEffect(() => {
    if (prevOpen.current === true && openProfile === false) {
      anchorRefProfile.current?.focus();
    }
    prevOpen.current = openProfile;
  }, [openProfile]);

  const handleLogout = async (e) => {
    handleCloseProfile(e);
    toast.promise(dispatch(logoutUser()).unwrap(), {
      loading: "Logging out...",
      success: "Logged out successfully",
      error: "Logout failed",
    });
    navigate("/login", { replace: true });
  };

  const handleCartDrawer = () => dispatch(toggleCartDrawer());

  const highlight = (text) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.replace(regex, "<b>$1</b>");
  };

  // ✅ FIX: useCallback (not useMemo) is correct for memoizing functions
  const fetchSuggestions = useCallback(
    debounce(async (value) => {
      if (!value) {
        setShowDropdown(true);
        return;
      }
      try {
        const { data } = await API.get(`/api/search/suggestions?q=${value}`);
        setSuggestions(data);
        setShowDropdown(true);
      } catch (error) {
        console.error("Search suggestions error:", error);
      }
    }, 400),
    []
  );

  // ✅ FIX: Cancel debounce on unmount to prevent memory leak
  useEffect(() => {
    return () => {
      fetchSuggestions.cancel();
    };
  }, [fetchSuggestions]);

  const saveRecentSearch = (value) => {
    if (!value.trim()) return;
    let recent = JSON.parse(localStorage.getItem("recentSearch")) || [];
    recent = [value, ...recent.filter((v) => v !== value)].slice(0, 5);
    localStorage.setItem("recentSearch", JSON.stringify(recent));
  };

  return (
    <header>
      {/* Top Strip */}
      <div className="header-strip p-2 border-t border-b border-gray-200 bg-orange-50">
        <div className="container flex justify-between text-sm text-gray-600">
          <div>🎉 Get up to 50% off new season styles — Limited time only!</div>
          <ul className="flex gap-3">
            <li><Link to="/help-center" className="hover:text-orange-500 transition-colors">Help Center</Link></li>
            <span className="text-gray-300">|</span>
            <li><Link to="/order-tracking" className="hover:text-orange-500 transition-colors">Order Tracking</Link></li>
          </ul>
        </div>
      </div>

      {/* Main Header */}
      <div className="header flex items-center border-b border-gray-200 bg-white px-4 py-3 sticky top-0 z-40 shadow-sm">
        {/* Logo */}
        <div className="col1 w-[25%]">
          <Link to="/">
            <img src="/images/logo.png" alt="Brain Store logo" className="h-12 object-contain" />
          </Link>
        </div>

        {/* Search */}
        <div className="col2 w-[45%]">
          <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
            <div className="relative">
              <div className="flex items-center bg-gray-100 border border-gray-200 rounded-xl px-3 h-11 gap-2 focus-within:border-orange-400 focus-within:ring-2 focus-within:ring-orange-100 transition-all">
                <FaSearch className="text-gray-400 flex-shrink-0" />
                <input
                  value={search}
                  className="flex-1 bg-transparent focus:outline-none text-sm"
                  type="text"
                  onFocus={() => setShowDropdown(true)}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearch(value);
                    if (!value.trim()) {
                      setSuggestions({ suggestions: [], products: [] });
                      setShowDropdown(true);
                      return;
                    }
                    fetchSuggestions(value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && search.trim()) {
                      saveRecentSearch(search);
                      setShowDropdown(false);
                      navigate(`/product-listing?search=${search}`);
                    }
                  }}
                  placeholder="Search for products..."
                />
                {search && (
                  <button
                    onClick={() => { setSearch(""); setSuggestions({ suggestions: [], products: [] }); }}
                    className="text-gray-400 hover:text-gray-600 text-lg leading-none"
                  >
                    ×
                  </button>
                )}
              </div>

              {/* Search Dropdown — ✅ IMPROVEMENT: Framer Motion animated */}
              <AnimatePresence>
                {showDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-full bg-white border border-gray-200 shadow-xl rounded-xl z-50 max-h-80 overflow-auto mt-1"
                  >
                    {/* Recent Searches */}
                    {!search && recent.length > 0 && (
                      <>
                        <div className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Recent Searches
                        </div>
                        {recent.map((item, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 hover:bg-orange-50 cursor-pointer flex items-center gap-2 text-sm text-gray-700"
                            onClick={() => navigate(`/product-listing?search=${item}`)}
                          >
                            <FaSearch className="text-gray-300 text-xs" />
                            {item}
                          </div>
                        ))}
                      </>
                    )}

                    {/* Suggestions */}
                    {search && suggestions?.suggestions?.length > 0 && (
                      <>
                        <div className="px-3 pt-3 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Suggestions
                        </div>
                        {suggestions.suggestions.map((s, i) => (
                          <div
                            key={i}
                            className="px-3 py-2 hover:bg-orange-50 cursor-pointer flex items-center gap-2 text-sm text-gray-700"
                            onClick={() => {
                              saveRecentSearch(s);
                              setShowDropdown(false);
                              navigate(`/product-listing?search=${s}`);
                            }}
                          >
                            <FaSearch className="text-gray-300 text-xs" />
                            {s}
                          </div>
                        ))}
                      </>
                    )}

                    {/* Product Results */}
                    {search && suggestions?.products?.length > 0 && (
                      <>
                        <div className="px-3 pt-2 pb-1 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                          Products
                        </div>
                        {suggestions.products.map((p) => (
                          <div
                            key={p._id}
                            className="px-3 py-2 flex gap-3 hover:bg-orange-50 cursor-pointer items-center"
                            onClick={() => {
                              setShowDropdown(false);
                              navigate(`/product/${p.slug}`);
                            }}
                          >
                            <img src={p.image} className="w-10 h-10 object-contain rounded-md border border-gray-100" alt={p.title} />
                            <span
                              className="text-sm text-gray-700"
                              dangerouslySetInnerHTML={{ __html: highlight(p.title) }}
                            />
                          </div>
                        ))}
                      </>
                    )}

                    {/* Empty state */}
                    {search && suggestions?.suggestions?.length === 0 && suggestions?.products?.length === 0 && (
                      <div className="px-4 py-6 text-center text-sm text-gray-400">
                        No results found for "{search}"
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </ClickAwayListener>
        </div>

        {/* Actions */}
        <div className="col3 w-[30%] flex items-center justify-end gap-2">
          {user ? (
            <>
              <Button
                ref={anchorRefProfile}
                id="profile-btn"
                className="flex flex-col"
                aria-controls={openProfile ? "composition-menu" : undefined}
                aria-expanded={openProfile ? "true" : undefined}
                aria-haspopup="true"
                onClick={handleToggleProfile}
              >
                <div className="flex items-center justify-center gap-2">
                  {user.avatar ? (
                    <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover border-2 border-orange-300" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <FaRegUser className="text-orange-500 text-sm" />
                    </div>
                  )}
                  <span className="text-gray-700 font-bold text-sm hidden md:block">{user?.name?.split(" ")[0]}</span>
                </div>
                {user?.role === "Admin" && (
                  <span className="text-[#e06213] font-bold text-[10px] leading-none">Admin</span>
                )}
              </Button>
              <Popper open={openProfile} anchorEl={anchorRefProfile.current} role={undefined} placement="bottom-end" transition disablePortal>
                {({ TransitionProps, placement }) => (
                  <Grow {...TransitionProps} style={{ transformOrigin: placement === "bottom-end" ? "right top" : "right bottom" }}>
                    <Paper elevation={3} sx={{ borderRadius: 2, border: "1px solid #f1f1f1", minWidth: 160 }}>
                      <ClickAwayListener onClickAway={handleCloseProfile}>
                        <MenuList autoFocusItem={openProfile} id="composition-menu" aria-labelledby="profile-btn" onKeyDown={handleListKeyDownProfile}>
                          {user.role === "Admin" && (
                            <MenuItem onClick={handleCloseProfile} sx={{ fontSize: 14 }}>
                              <Link to="/admin" className="w-full">Dashboard</Link>
                            </MenuItem>
                          )}
                          <MenuItem onClick={handleCloseProfile} sx={{ fontSize: 14 }}>
                            <Link to="/my-account" className="w-full">My Account</Link>
                          </MenuItem>
                          <MenuItem onClick={handleCloseProfile} sx={{ fontSize: 14 }}>
                            <Link to="/orders" className="w-full">My Orders</Link>
                          </MenuItem>
                          <MenuItem onClick={handleLogout} sx={{ fontSize: 14, color: "#e06213", fontWeight: 600 }}>
                            Logout
                          </MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
          ) : (
            <div className="flex gap-3 text-sm font-semibold">
              <Link to="/login" className="text-gray-600 hover:text-orange-500 transition-colors">Login</Link>
              <span className="text-gray-300">|</span>
              <Link to="/register" className="text-orange-500 hover:text-orange-600 transition-colors">Sign Up</Link>
            </div>
          )}

          <div className="flex gap-1">
            <IconButton onClick={() => navigate("/compare")} size="small" title="Compare">
              <IoGitCompareOutline />
              <CartBadge badgeContent={compareItems.length} color="primary" overlap="circular" />
            </IconButton>
            <IconButton onClick={() => navigate("/wishlist")} size="small" title="Wishlist">
              <IoMdHeartEmpty />
              <CartBadge badgeContent={wishlistItems.length} color="primary" overlap="circular" />
            </IconButton>
            <IconButton onClick={handleCartDrawer} size="small" title="Cart">
              <MdOutlineShoppingCart />
              <CartBadge badgeContent={totalCount} color="primary" overlap="circular" />
            </IconButton>
          </div>
        </div>
      </div>

      {/* Bottom Nav Strip */}
      <div className="w-full flex items-center border-b border-gray-100 bg-white px-4 py-1.5 shadow-xs">
        <div className="col1 flex items-center w-[25%]">
          <Button className="text-black! rounded-full" onClick={toggleDrawer(true)} size="small">
            <RiMenu2Fill />
          </Button>
          <Button className="text-black! text-sm!" size="small">
            <div className="flex gap-1.5 items-center text-gray-700">
              Shop By Category
              <IoIosArrowDown className="text-xs" />
            </div>
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>{DrawerList}</Drawer>
        </div>
        <div className="col2 w-[55%] flex gap-6 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <Link to="/product-listing" className="hover:text-orange-500 transition-colors">Products</Link>
          <Link to="/orders" className="hover:text-orange-500 transition-colors">My Orders</Link>
          <Link to="/wishlist" className="hover:text-orange-500 transition-colors">Wishlist</Link>
        </div>
        <div className="col3 w-[20%] flex justify-end items-center gap-1.5 text-xs text-gray-500 font-medium">
          <HiOutlineRocketLaunch className="text-orange-500" />
          Free Delivery above ₹499
        </div>
      </div>
    </header>
  );
};

export default Header;
