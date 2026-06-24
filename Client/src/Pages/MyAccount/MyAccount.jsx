import { Button, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdLogout, MdOutlineArrowDropDown } from "react-icons/md";
import { IoBagCheckSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import TextField from "@mui/material/TextField";

import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  resetAuthState,
  updateProfile,
} from "../../redux/slice/authSlice";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0, 3.99),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, 4.99),
  createData("Eclair", 262, 16.0, 24, 6.0, 3.79),
  createData("Cupcake", 305, 3.7, 67, 4.3, 2.5),
  createData("Gingerbread", 356, 16.0, 49, 3.9, 1.5),
];

const MyAccount = () => {
  const [index, setIndex] = useState(0);
  const menuItems = [
    { id: 0, label: "My Profile", icon: FaRegUser },
    { id: 1, label: "My List", icon: FaRegHeart },
    { id: 2, label: "My Order", icon: IoBagCheckSharp },
    { id: 3, label: "Log Out", icon: MdLogout },
  ];
  const { user, error, profileSuccess } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(resetAuthState());
      return;
    }
    if (profileSuccess) {
      toast.success("Profile Updated Successfully");
      dispatch(resetAuthState());
      return;
    }
  }, [error, profileSuccess]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        mobile: user?.mobile || "",
      });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleCancel = (e) => {
    setFormData({
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
    });
  };
  const handleUpdateProfile = () => {
    if (formData.name === "") return toast.error("Name is required");
    if (formData.email === "") return toast.error("Email is required");
    if (formData.mobile === "") return toast.error("Mobile is required");

    dispatch(updateProfile(formData));
  };

  const handleLogout = () => {
    toast.promise(dispatch(logoutUser()).unwrap(), {
      loading: "Logging out...",
      success: "Logout success",
      failed: "Logout failed",
    });
    navigate('/', { replace: true });
  };

  return (
    <section className="bg-gray-100">
      <div className="container flex gap-10 py-10! items-start">
        <div className="w-[20%] bg-white border border-gray-300 flex flex-col items-center rounded-md">
          <div className="w-20 h-20 rounded-full overflow-hidden mt-2!">
            <img
              className="w-full h-full object-cover object-top"
              src="https://www.pngall.com/wp-content/uploads/15/User-PNG-Images-HD.png"
              alt="user image"
            />
          </div>
          <h3 className="font-bold mt-3! mb-0!">{user?.name}</h3>
          <p className="text-gray-700 mt-1! mb-4! text-[14px]">{user?.email}</p>
          <div className="flex flex-col w-full gap-0.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  className={`w-full! min-w-full! justify-start! px-4! gap-2 text-black! font-bold! rounded-none! transition-all bg-gray-50! ${
                    index === item.id &&
                    "border-l-[3px]! border-[#e06213]! text-[#e06213]! bg-[#ffede2]!"
                  }`}
                  onClick={() => setIndex(item.id)}
                >
                  <Icon
                    className={`text-[18px] ${
                      index === item.id && "text-[#e06213]!"
                    }`}
                  />
                  {item.label}
                </Button>
              );
            })}
          </div>
        </div>
        <div className="w-[60%] bg-white border border-gray-300 rounded-md pb-3!">
          {index === 0 && (
            <div className="px-3 py-2">
              <h3 className="font-bold mt-3! mb-6! pb-2! border-b border-gray-400 text-[20px]">
                My Profile
              </h3>
              <div className="flex flex-wrap justify-between">
                <TextField
                  className="w-[49%]"
                  size="small"
                  label="Full Name"
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleFormChange}
                />
                <TextField
                  className="w-[49%]"
                  size="small"
                  label="Email"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleFormChange}
                />
                <TextField
                  className="w-[49%] mt-4! mb-2!"
                  size="small"
                  label="Mobile No."
                  name="mobile"
                  variant="outlined"
                  inputProps={{ maxLength: 10 }}
                  value={formData.mobile}
                  onChange={handleFormChange}
                />
              </div>
              <div className="flex gap-3 mt-2!">
                <Button className="btn-primary" onClick={handleUpdateProfile}>
                  SAVE
                </Button>
                <Button className="btn-secondary" onClick={handleCancel}>
                  CANCEL
                </Button>
              </div>
            </div>
          )}
          {index === 1 && (
            <div className="px-4 py-5">
              <h3 className="text-[16px] font-bold mb-2!">Your Cart</h3>
              <p className="mb-3!">
                There are <span className="text-primary">2</span> products in
                your cart.
              </p>

              <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-[13px]">
                    Sangaria
                  </p>
                  <h3 className="font-bold">
                    A-Line Kurti With Sharana & Dupatta
                  </h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <div className="flex gap-4 items-center">
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Size: S <MdOutlineArrowDropDown />
                    </span>
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Qty: 1 <MdOutlineArrowDropDown />
                    </span>
                  </div>
                  <div className="flex gap-3 items-center font-bold">
                    <span>$58.00</span>
                    <span className="line-through">$58.00</span>
                    <span className="text-primary">20% OFF</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-[13px]">
                    Sangaria
                  </p>
                  <h3 className="font-bold">
                    A-Line Kurti With Sharana & Dupatta
                  </h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <div className="flex gap-4 items-center">
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Size: S <MdOutlineArrowDropDown />
                    </span>
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Qty: 1 <MdOutlineArrowDropDown />
                    </span>
                  </div>
                  <div className="flex gap-3 items-center font-bold">
                    <span>$58.00</span>
                    <span className="line-through">$58.00</span>
                    <span className="text-primary">20% OFF</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-[13px]">
                    Sangaria
                  </p>
                  <h3 className="font-bold">
                    A-Line Kurti With Sharana & Dupatta
                  </h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <div className="flex gap-4 items-center">
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Size: S <MdOutlineArrowDropDown />
                    </span>
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Qty: 1 <MdOutlineArrowDropDown />
                    </span>
                  </div>
                  <div className="flex gap-3 items-center font-bold">
                    <span>$58.00</span>
                    <span className="line-through">$58.00</span>
                    <span className="text-primary">20% OFF</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-[13px]">
                    Sangaria
                  </p>
                  <h3 className="font-bold">
                    A-Line Kurti With Sharana & Dupatta
                  </h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <div className="flex gap-4 items-center">
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Size: S <MdOutlineArrowDropDown />
                    </span>
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Qty: 1 <MdOutlineArrowDropDown />
                    </span>
                  </div>
                  <div className="flex gap-3 items-center font-bold">
                    <span>$58.00</span>
                    <span className="line-through">$58.00</span>
                    <span className="text-primary">20% OFF</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-[13px]">
                    Sangaria
                  </p>
                  <h3 className="font-bold">
                    A-Line Kurti With Sharana & Dupatta
                  </h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <div className="flex gap-4 items-center">
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Size: S <MdOutlineArrowDropDown />
                    </span>
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Qty: 1 <MdOutlineArrowDropDown />
                    </span>
                  </div>
                  <div className="flex gap-3 items-center font-bold">
                    <span>$58.00</span>
                    <span className="line-through">$58.00</span>
                    <span className="text-primary">20% OFF</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-8 border-b border-gray-300 pb-2 mt-2! mb-3!">
                <div className="w-30 h-30 rounded-md overflow-hidden">
                  <img
                    className="w-full h-full object-cover object-top"
                    src="https://api.spicezgold.com/download/file_1734529297930_fiorra-women-s-teapot-blue-pure-cotton-a-line-kurta-with-sharara-and-dupatta-product-images-rvo9n8udfg-1-202307260626.jpg"
                  />
                </div>
                <div>
                  <p className="text-gray-500 font-medium text-[13px]">
                    Sangaria
                  </p>
                  <h3 className="font-bold">
                    A-Line Kurti With Sharana & Dupatta
                  </h3>
                  <Rating
                    name="half-rating-read"
                    defaultValue={2.5}
                    precision={0.5}
                    readOnly
                  />
                  <div className="flex gap-4 items-center">
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Size: S <MdOutlineArrowDropDown />
                    </span>
                    <span className="flex gap-1 items-center bg-gray-200 rounded-md py-1 px-2 text-[13px] font-medium">
                      Qty: 1 <MdOutlineArrowDropDown />
                    </span>
                  </div>
                  <div className="flex gap-3 items-center font-bold">
                    <span>$58.00</span>
                    <span className="line-through">$58.00</span>
                    <span className="text-primary">20% OFF</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {index === 2 && (
            <div>
              <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Dessert (100g serving)</TableCell>
                      <TableCell align="right">Calories</TableCell>
                      <TableCell align="right">Fat&nbsp;(g)</TableCell>
                      <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                      <TableCell align="right">Protein&nbsp;(g)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <Row key={row.name} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          {index === 3 && (
            <div className="py-6 px-6 bg-white rounded-lg text-center">
            <h2 className="text-lg font-semibold mb-3!">
              Are you sure you want to logout?
            </h2>
          
            <div className="flex justify-center gap-4">
              <Button
                variant="contained"
                className="btn-primary"
                onClick={handleLogout}
              >
                LOGOUT
              </Button>
          
              <Button
                variant="outlined"
                className="btn-secondary"
                onClick={() => setIndex(0)}
              >
                CANCEL
              </Button>
            </div>
          </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyAccount;
