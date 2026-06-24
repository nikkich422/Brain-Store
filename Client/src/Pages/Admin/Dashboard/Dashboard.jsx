import React, { useEffect, useMemo, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  Skeleton,
} from "@mui/material";

import { alpha } from "@mui/material/styles";
import { visuallyHidden } from "@mui/utils";

import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { IoMdAdd } from "react-icons/io";
import { IoGiftOutline } from "react-icons/io5";
import { LiaShippingFastSolid } from "react-icons/lia";

import API from "../../../api/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import ProductListingCard from "../../../Components/ProductListingCard";

function OrderRow({ order }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        sx={{
          "& > *": { borderBottom: "unset" },
          transition: "0.2s",
          "&:hover": {
            backgroundColor: "#f8fafc",
          },
        }}
      >
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{order.orderNumber}</TableCell>

        <TableCell align="right">{order.deliveryAddress?.fullName}</TableCell>

        <TableCell align="right">₹ {order.totalAmt}</TableCell>

        <TableCell align="right">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold ${
              order.paymentStatus === "Paid"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {order.paymentStatus}
          </span>
        </TableCell>

        <TableCell align="right">
          {new Date(order.createdAt).toLocaleDateString()}
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell
          style={{
            paddingBottom: 0,
            paddingTop: 0,
          }}
          colSpan={6}
        >
          <Collapse in={open}>
            <Box sx={{ margin: 2 }}>
              <Typography variant="h6" gutterBottom fontWeight="bold">
                Ordered Products
              </Typography>

              <Table size="small">
                <TableHead
                  sx={{
                    backgroundColor: "#f8fafc",
                  }}
                >
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell align="right">Qty</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {order.orderItems.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>{item.name}</TableCell>

                      <TableCell>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 object-cover rounded-xl"
                        />
                      </TableCell>

                      <TableCell align="right">{item.qty}</TableCell>

                      <TableCell align="right">₹ {item.price}</TableCell>

                      <TableCell align="right">₹ {item.totalPrice}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "title",
    numeric: false,
    disablePadding: true,
    label: "Product",
  },
  {
    id: "price",
    numeric: true,
    disablePadding: false,
    label: "Price",
  },
  {
    id: "stock_count",
    numeric: true,
    disablePadding: false,
    label: "Stock",
  },
  {
    id: "category",
    numeric: false,
    disablePadding: false,
    label: "Category",
  },
  {
    id: "brand",
    numeric: false,
    disablePadding: false,
    label: "Brand",
  },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead
      sx={{
        backgroundColor: "#f8fafc",
      }}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>

        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}

              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar({ numSelected }) {
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 3 },
          pr: { xs: 1, sm: 1 },
          py: 1,
        },

        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h5" fontWeight="bold">
          Products
        </Typography>
      )}

      {numSelected > 0 ? (
        <IconButton>
          <DeleteIcon />
        </IconButton>
      ) : (
        <IconButton>
          <FilterListIcon />
        </IconButton>
      )}
    </Toolbar>
  );
}

const DashboardLoading = () => {
  return (
    <div className="min-h-screen bg-[#f4f7fb] p-6">
      <div className="space-y-6">
        <Skeleton
          variant="rounded"
          height={220}
          sx={{ borderRadius: "24px" }}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rounded"
              height={140}
              sx={{ borderRadius: "24px" }}
            />
          ))}
        </div>

        <Skeleton
          variant="rounded"
          height={450}
          sx={{ borderRadius: "24px" }}
        />

        <Skeleton
          variant="rounded"
          height={450}
          sx={{ borderRadius: "24px" }}
        />

        <Skeleton
          variant="rounded"
          height={400}
          sx={{ borderRadius: "24px" }}
        />
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const chartData = stats?.salesChart?.map((item) => ({
    name: `${item._id.day}/${item._id.month}`,
    sales: item.total,
  }));

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const dashboardRes = await API.get("/api/dashboard");
      const productRes = await API.get("/api/product?perPage=100");

      setStats(dashboardRes.data.data);

      setProducts(productRes.data.products || productRes.data.data || []);
    } catch (error) {
      console.error(error);

      setError(error.message);

      toast.error("Failed to fetch dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";

    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n._id);

      setSelected(newSelected);

      return;
    }

    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);

    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const visibleRows = useMemo(
    () =>
      [...products]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),

    [products, order, orderBy, page, rowsPerPage]
  );

  if (loading) {
    return <DashboardLoading />;
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#f4f7fb] px-6 py-6 overflow-auto">
      {/* HERO */}

      <div className="relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-6 bg-linear-to-r from-indigo-600 via-purple-600 to-blue-500 text-white px-8 py-8 rounded-3xl shadow-xl">
        <div className="flex flex-col gap-5 items-start">
          <h1 className="text-4xl lg:text-5xl font-black leading-tight">
            Welcome Back 👋
            <br />
            Admin
          </h1>

          <p className="text-white/80 max-w-md">
            Monitor your sales, customers, orders and inventory from one place.
          </p>

          <div className="flex gap-2">
            <Button
              onClick={() => navigate("/admin/products/add")}
              className="bg-white! text-indigo-700! hover:bg-indigo-50! px-5! py-3! rounded-xl! font-bold! shadow-lg! flex items-center gap-2"
              >
              <IoMdAdd className="text-xl" />
              Add Product
            </Button>
            <Button
              onClick={() => navigate("/admin/orders")}
              className="bg-white! text-indigo-700! hover:bg-indigo-50! px-5! py-3! rounded-xl! font-bold! shadow-lg! flex items-center gap-2"
              >
              <LiaShippingFastSolid className="text-xl" />
              Manage Orders
            </Button>
            </div>
        </div>

        <div className="w-64 hidden lg:block">
          <img
            className="w-full drop-shadow-2xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzki_RZLBFqHC2EbWTv3xeqSMqPjIojJMrfA&s"
            alt="store"
          />
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
        {[
          {
            title: "Total Orders",
            value: stats?.totalOrders || 0,
            color: "bg-indigo-100 text-indigo-600",
          },

          {
            title: "Total Products",
            value: stats?.totalProducts || 0,
            color: "bg-orange-100 text-orange-600",
          },

          {
            title: "Total Users",
            value: stats?.totalUsers || 0,
            color: "bg-green-100 text-green-600",
          },

          {
            title: "Total Revenue",
            value: `₹ ${stats?.totalRevenue?.toLocaleString("en-IN")}`,
            color: "bg-pink-100 text-pink-600",
          },
          {
            title: "Pending Orders",
            value: stats?.pendingOrders || 0,
            color: "bg-yellow-100 text-yellow-600",
          }
        ].map((card, index) => (
          <div
            key={index}
            className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="text-3xl font-black mt-2 text-gray-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`h-14 w-14 rounded-2xl flex items-center justify-center ${card.color}`}
              >
                <IoGiftOutline className="text-3xl" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PRODUCTS TABLE */}

      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <Paper elevation={0} sx={{ width: "100%" }}>
          <EnhancedTableToolbar numSelected={selected.length} />

          <TableContainer>
            <Table>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />

              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row._id);

                  return (
                    <TableRow
                      key={row._id}
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",

                        transition: "0.2s",

                        "&:hover": {
                          backgroundColor: "#f5f7ff",
                        },
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox checked={isItemSelected} />
                      </TableCell>

                      <TableCell>{row.title}</TableCell>

                      <TableCell align="right">₹ {row.price}</TableCell>

                      <TableCell align="right">{row.stock_count}</TableCell>

                      <TableCell align="right">{row.category}</TableCell>

                      <TableCell align="right">
                        {row.brand || "No Brand"}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={(event) =>
              setRowsPerPage(parseInt(event.target.value, 10))
            }
          />
        </Paper>
      </div>

      {/* ORDERS */}

      <div className="mt-6 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <TableContainer component={Paper}>
          <Table>
            <TableHead
              sx={{
                backgroundColor: "#f8fafc",
              }}
            >
              <TableRow>
                <TableCell />
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Customer</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Payment</TableCell>
                <TableCell align="right">Date</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {stats?.recentOrders?.map((order) => (
                <OrderRow key={order._id} order={order} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* CHART */}

      <div className="mt-6 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        <div className="mb-6">
          <h2 className="text-2xl font-black text-gray-800">Sales Analytics</h2>

          <p className="text-gray-500 text-sm">Revenue performance over time</p>
        </div>

        <div className="w-full h-100">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip
                contentStyle={{
                  borderRadius: "16px",
                  border: "none",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="sales"
                stroke="#4f46e5"
                strokeWidth={4}
                dot={{
                  r: 4,
                  fill: "#4f46e5",
                }}
                activeDot={{
                  r: 8,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* LOW STOCK */}

      <div className="bg-white rounded-3xl border border-gray-100 mt-6 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-2xl font-black text-gray-800">
              Low Stock Products
            </h2>

            <p className="text-gray-500 text-sm">
              Products that need restocking
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {stats?.lowStockProducts?.map((product) => (
            <ProductListingCard key={product._id} item={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
